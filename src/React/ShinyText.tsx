"use client";

import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 10, className = '' }) => {
    const animationDuration = `${speed}s`;

    return (
        <div
            className={`text-white bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
            style={{
                backgroundImage: 'linear-gradient(to right, #808080, #808080 45%, #fff 50%, #808080 55%, #808080 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animationDuration: animationDuration,
            }}
        >
            {text}
        </div>
    );
};

export default ShinyText;