import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}) {
    if (name === 'NeutralMirror') {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                {...props}
            >
                <rect x="3" y="3" width="18" height="18" rx="4" stroke={color} strokeWidth={strokeWidth} />
                <line x1="12" y1="6" x2="12" y2="18" stroke={color} strokeWidth={strokeWidth} />
                <line x1="7" y1="7" x2="9.5" y2="9.5" stroke={color} strokeWidth={strokeWidth - 1} opacity="0.6" />
                <line x1="14.5" y1="14.5" x2="17" y2="17" stroke={color} strokeWidth={strokeWidth - 1} opacity="0.6" />
            </svg>
        );
    }

    const IconComponent = LucideIcons?.[name];

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
    />;
}
export default Icon;