// Media and File System utility functions

/**
 * Request access to the user's camera.
 * @param {MediaTrackConstraints} [videoConstraints]
 * @returns {Promise<MediaStream>}
 */
export async function requestCameraStream(videoConstraints) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia is not supported in this browser.");
    }
    const constraints = { video: videoConstraints || true, audio: false };
    return navigator.mediaDevices.getUserMedia(constraints);
}

/**
 * Request access to the user's microphone.
 * @param {MediaTrackConstraints} [audioConstraints]
 * @returns {Promise<MediaStream>}
 */
export async function requestMicrophoneStream(audioConstraints) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia is not supported in this browser.");
    }
    const constraints = { audio: audioConstraints || true, video: false };
    return navigator.mediaDevices.getUserMedia(constraints);
}

/**
 * Stop all tracks in a media stream.
 * @param {MediaStream | null | undefined} stream
 */
export function stopMediaStream(stream) {
    if (!stream) return;
    try {
        stream.getTracks().forEach((track) => {
            try { track.stop(); } catch (_) {}
        });
    } catch (_) {}
}

/**
 * Capture a photo from a video MediaStream.
 * @param {MediaStream} stream
 * @param {{ width?: number, height?: number, mimeType?: string, quality?: number }} [options]
 * @returns {Promise<Blob>} Blob of the image
 */
export async function capturePhotoFromStream(stream, options) {
    const { width, height, mimeType = "image/png", quality } = options || {};

    const videoTrack = stream.getVideoTracks && stream.getVideoTracks()[0];
    if (!videoTrack) {
        throw new Error("No video track available on the provided stream.");
    }

    // Try ImageCapture API if available for potentially better quality
    if (window.ImageCapture && typeof window.ImageCapture === "function") {
        try {
            const imageCapture = new window.ImageCapture(videoTrack);
            const photo = await imageCapture.takePhoto();
            return photo;
        } catch (_) {
            // Fall back to canvas capture below
        }
    }

    const settings = videoTrack.getSettings ? videoTrack.getSettings() : {};
    const targetWidth = width || settings.width || 1280;
    const targetHeight = height || settings.height || 720;

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");

    const video = document.createElement("video");
    video.srcObject = stream;
    video.playsInline = true;

    await new Promise((resolve) => {
        video.onloadedmetadata = () => resolve();
    });

    // Draw the current frame
    ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to capture image."));
        }, mimeType, quality);
    });
}

/**
 * Create an audio recorder around MediaRecorder with convenient start/stop promises.
 * If no stream is provided, it will request microphone access.
 * @param {MediaStream} [inputStream]
 * @param {string} [mimeType]
 * @returns {{ start: () => void, stop: () => Promise<Blob>, pause: () => void, resume: () => void, mediaRecorder: MediaRecorder }}
 */
export function createAudioRecorder(inputStream, mimeType) {
    if (typeof window === "undefined") {
        throw new Error("Audio recording is only available in the browser.");
    }

    const state = {
        streamPromise: inputStream
            ? Promise.resolve(inputStream)
            : requestMicrophoneStream(),
        mediaRecorder: null,
        chunks: []
    };

    const start = async () => {
        const stream = await state.streamPromise;
        const supportedType = mimeType && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined;
        state.mediaRecorder = new MediaRecorder(stream, supportedType ? { mimeType: supportedType } : undefined);
        state.chunks = [];
        state.mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) state.chunks.push(event.data);
        };
        state.mediaRecorder.start();
    };

    const stop = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const recorder = state.mediaRecorder;
                if (!recorder) return resolve(new Blob());
                recorder.onstop = () => {
                    const type = recorder.mimeType || mimeType || "audio/webm";
                    const blob = new Blob(state.chunks, { type });
                    resolve(blob);
                };
                recorder.stop();
            } catch (error) {
                reject(error);
            }
        });
    };

    const pause = () => {
        if (state.mediaRecorder && state.mediaRecorder.state === "recording") state.mediaRecorder.pause();
    };

    const resume = () => {
        if (state.mediaRecorder && state.mediaRecorder.state === "paused") state.mediaRecorder.resume();
    };

    return {
        start,
        stop,
        pause,
        resume,
        get mediaRecorder() { return state.mediaRecorder; }
    };
}

/**
 * Check for File System Access API support.
 * @returns {boolean}
 */
export function hasFileSystemAccessAPI() {
    return typeof window !== "undefined" && (
        !!window.showOpenFilePicker || !!window.showSaveFilePicker || !!window.chooseFileSystemEntries
    );
}

/**
 * Open files using File System Access API if available, otherwise fallback to input element.
 * @param {{ multiple?: boolean, types?: Array<{ description?: string, accept: Record<string, string[]> }> }} [options]
 * @returns {Promise<Array<{ name: string, blob: Blob, fileHandle?: FileSystemFileHandle }>>}
 */
export async function openFiles(options) {
    const { multiple = false, types } = options || {};

    if (window.showOpenFilePicker) {
        const handles = await window.showOpenFilePicker({ multiple, types });
        const results = [];
        for (const handle of handles) {
            const file = await handle.getFile();
            results.push({ name: file.name, blob: file, fileHandle: handle });
        }
        return results;
    }

    // Fallback input based picker
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = multiple;
        if (types && types.length > 0) {
            const acceptList = [];
            for (const t of types) {
                if (t.accept) {
                    for (const [mime, exts] of Object.entries(t.accept)) {
                        acceptList.push(mime);
                        acceptList.push(...exts.map((e) => (e.startsWith(".") ? e : `.${e}`)));
                    }
                }
            }
            if (acceptList.length > 0) input.accept = acceptList.join(",");
        }
        input.onchange = () => {
            const files = Array.from(input.files || []);
            resolve(files.map((f) => ({ name: f.name, blob: f })));
        };
        input.click();
    });
}

/**
 * Save a file using File System Access API if available, otherwise fallback to download.
 * @param {Blob | string | ArrayBuffer | Uint8Array} content
 * @param {string} suggestedName
 * @param {{ types?: Array<{ description?: string, accept: Record<string, string[]> }>, mimeType?: string }} [options]
 * @returns {Promise<void>}
 */
export async function saveFile(content, suggestedName, options) {
    const { types, mimeType } = options || {};
    const blob = normalizeToBlob(content, mimeType);

    if (window.showSaveFilePicker) {
        const handle = await window.showSaveFilePicker({ suggestedName, types });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return;
    }

    // Fallback: anchor download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = suggestedName || "download";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

/**
 * Convert various content inputs into a Blob.
 * @param {Blob | string | ArrayBuffer | Uint8Array} content
 * @param {string} [mimeType]
 * @returns {Blob}
 */
function normalizeToBlob(content, mimeType) {
    if (content instanceof Blob) return content;
    if (typeof content === "string") return new Blob([content], { type: mimeType || "text/plain" });
    if (content instanceof ArrayBuffer) return new Blob([content], { type: mimeType || "application/octet-stream" });
    if (content instanceof Uint8Array) return new Blob([content.buffer], { type: mimeType || "application/octet-stream" });
    throw new Error("Unsupported content type for saving file.");
}


