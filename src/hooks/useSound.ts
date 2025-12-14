"use client";

import { useEffect, useRef } from 'react';

type SoundType = 'click' | 'reveal' | 'flip' | 'success' | 'gameover';

export const useSound = () => {
    // We'll use simple Audio objects for now.
    // In a real production app, we might preload these.

    const playSound = (type: SoundType) => {
        try {
            // Check if vibration is supported and trigger it
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                if (type === 'click') navigator.vibrate(10);
                if (type === 'flip') navigator.vibrate(20);
                if (type === 'reveal') navigator.vibrate([30, 30, 30]);
                if (type === 'success') navigator.vibrate([50, 50, 50]);
            }

            // Placeholder for actual audio files
            // const audio = new Audio(`/sounds/${type}.mp3`);
            // audio.play().catch(e => console.log('Audio play failed', e));
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    return { playSound };
};
