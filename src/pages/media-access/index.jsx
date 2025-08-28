import React, { useEffect, useRef, useState } from "react";
import Button from "components/ui/Button";
import Icon from "components/AppIcon";
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import {
  requestCameraStream,
  requestMicrophoneStream,
  stopMediaStream,
  capturePhotoFromStream,
  createAudioRecorder,
  openFiles,
  saveFile,
  hasFileSystemAccessAPI
} from "utils/media";

const MediaAccessPage = () => {
  // Camera state
  const videoRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImageUrl, setCapturedImageUrl] = useState("");
  const [isStartingCamera, setIsStartingCamera] = useState(false);

  // Microphone state
  const [microphoneStream, setMicrophoneStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [isStartingMic, setIsStartingMic] = useState(false);

  // Files state
  const [pickedFiles, setPickedFiles] = useState([]);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
    return () => {
      stopMediaStream(cameraStream);
    };
  }, [cameraStream]);

  useEffect(() => {
    return () => {
      stopMediaStream(microphoneStream);
    };
  }, [microphoneStream]);

  const handleStartCamera = async () => {
    try {
      setIsStartingCamera(true);
      const stream = await requestCameraStream();
      setCameraStream(stream);
    } catch (e) {
      alert(e.message || "Failed to start camera");
    } finally {
      setIsStartingCamera(false);
    }
  };

  const handleStopCamera = () => {
    stopMediaStream(cameraStream);
    setCameraStream(null);
  };

  const handleCapturePhoto = async () => {
    if (!cameraStream) return;
    try {
      const blob = await capturePhotoFromStream(cameraStream, { mimeType: "image/png" });
      const url = URL.createObjectURL(blob);
      if (capturedImageUrl) URL.revokeObjectURL(capturedImageUrl);
      setCapturedImageUrl(url);
    } catch (e) {
      alert(e.message || "Failed to capture photo");
    }
  };

  const handleDownloadPhoto = async () => {
    if (!capturedImageUrl) return;
    const res = await fetch(capturedImageUrl);
    const blob = await res.blob();
    await saveFile(blob, "photo.png", { mimeType: "image/png" });
  };

  const handleStartMic = async () => {
    try {
      setIsStartingMic(true);
      const stream = await requestMicrophoneStream();
      setMicrophoneStream(stream);
      const rec = createAudioRecorder(stream);
      await rec.start();
      setRecorder(rec);
      setIsRecording(true);
    } catch (e) {
      alert(e.message || "Failed to start microphone");
    } finally {
      setIsStartingMic(false);
    }
  };

  const handleStopMic = async () => {
    if (!recorder) return;
    try {
      const blob = await recorder.stop();
      const url = URL.createObjectURL(blob);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(url);
    } catch (e) {
      alert(e.message || "Recording stop failed");
    } finally {
      setIsRecording(false);
      setRecorder(null);
    }
  };

  const handlePickFiles = async () => {
    try {
      const files = await openFiles({ multiple: true });
      setPickedFiles(files.map(f => ({ name: f.name, size: f.blob.size })));
    } catch (e) {
      alert(e.message || "File pick failed");
    }
  };

  const handleSaveSample = async () => {
    await saveFile("Hello from Neutral Mirror!", "sample.txt", { mimeType: "text/plain" });
  };

  return (
    <>
    <br></br>
    <br></br>
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Scan & Verify</h1>
          <p className="text-sm text-muted-foreground">Use your camera, microphone, or files to begin verification.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border ${cameraStream ? 'border-primary/30 text-primary bg-primary/10' : 'border-border'}`}>
            <Icon name="Camera" size={14} />
            <span>{cameraStream ? 'Camera Active' : 'Camera Idle'}</span>
          </div>
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border ${isRecording ? 'border-primary/30 text-primary bg-primary/10' : 'border-border'}`}>
            <Icon name="Mic" size={14} />
            <span>{isRecording ? 'Recording' : 'Mic Idle'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Card */}
        <section className="bg-card border border-border rounded-xl shadow-subtle p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Icon name="Camera" size={18} />
              </div>
              <h2 className="text-lg font-medium">Camera</h2>
            </div>
            <span className="text-xs text-muted-foreground">Permissions required</span>
          </div>

          <div className="flex flex-col md:flex-row gap-5 items-start">
            <div className="w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <video ref={videoRef} autoPlay playsInline className="w-full aspect-video bg-black rounded-md" />
                {!cameraStream && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs text-muted-foreground bg-background/70 rounded px-2 py-1">Camera preview</div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 w-full space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {!cameraStream ? (
                  <Button onClick={handleStartCamera} loading={isStartingCamera} iconName="Camera">
                    Start Camera
                  </Button>
                ) : (
                  <>
                    <Button variant="secondary" onClick={handleCapturePhoto} iconName="Camera">
                      Capture Photo
                    </Button>
                    <Button variant="outline" onClick={handleStopCamera} iconName="Power">
                      Stop Camera
                    </Button>
                  </>
                )}
              </div>
              <div className="space-y-2">
                {capturedImageUrl ? (
                  <div className="space-y-2">
                    <img src={capturedImageUrl} alt="Captured" className="w-full md:w-80 aspect-video object-contain border rounded-md" />
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={handleDownloadPhoto} iconName="Download">Download</Button>
                      <span className="text-xs text-muted-foreground">PNG • {hasFileSystemAccessAPI() ? 'Saved via FS API if supported' : 'Saved via download'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">No photo captured yet.</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Microphone Card */}
        <section className="bg-card border border-border rounded-xl shadow-subtle p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Icon name="Mic" size={18} />
              </div>
              <h2 className="text-lg font-medium">Microphone</h2>
            </div>
            <span className="text-xs text-muted-foreground">Permissions required</span>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {!isRecording ? (
                <Button onClick={handleStartMic} loading={isStartingMic} iconName="Mic">Start Recording</Button>
              ) : (
                <Button variant="outline" onClick={handleStopMic} iconName="Square">Stop Recording</Button>
              )}
            </div>
            <div>
              {audioUrl ? (
                <audio controls src={audioUrl} className="w-full" />
              ) : (
                <div className="text-xs text-muted-foreground">No recording yet.</div>
              )}
            </div>
          </div>
        </section>

        {/* Files Card */}
        <section className="bg-card border border-border rounded-xl shadow-subtle p-5 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Icon name="FolderOpen" size={18} />
              </div>
              <h2 className="text-lg font-medium">Files</h2>
            </div>
            <span className="text-xs text-muted-foreground">{hasFileSystemAccessAPI() ? 'File System Access API available' : 'Using browser fallback'}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handlePickFiles} iconName="Upload">Open Files</Button>
            <Button variant="secondary" onClick={handleSaveSample} iconName="Save">Save Sample Text</Button>
          </div>

          <div className="text-sm">
            {pickedFiles.length ? (
              <ul className="divide-y divide-border rounded-md border border-border">
                {pickedFiles.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="flex items-center justify-between px-3 py-2">
                    <span className="truncate mr-2">{f.name}</span>
                    <span className="text-xs text-muted-foreground">{f.size} bytes</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-xs text-muted-foreground">No files selected yet.</div>
            )}
          </div>
        </section>
      </div>

      <div className="text-xs text-muted-foreground">
        Tip: Some actions require a user click due to browser permission policies.
      </div>
    </div>

     <Header />

      <Footer />
    </>
    
  );
};

export default MediaAccessPage;


