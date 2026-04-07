import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Subscribe globally to active index to build dynamic audio immersion
    const activePlanetIndex = useStore(state => state.activePlanetIndex);

    // Dynamic Volume Swelling / Dropping Effect Based on Planetary Focus
    useEffect(() => {
        if (audioRef.current && isPlaying) {
            // Baseline atmospheric tracking. Sun/Empty sky=0.15. Direct planet proximity=0.35.
            const isPlanetFocused = activePlanetIndex !== -1 && activePlanetIndex < 8;
            const targetVolume = isPlanetFocused ? 0.35 : 0.15;

            // Manual mathematically exact continuous Interpolator tracking HTML5 DOM limitations heavily
            const faderId = setInterval(() => {
                if (!audioRef.current) {
                    clearInterval(faderId);
                    return;
                }
                const currentVolume = audioRef.current.volume;
                if (Math.abs(currentVolume - targetVolume) < 0.02) {
                    audioRef.current.volume = targetVolume;
                    clearInterval(faderId); // Cleanup
                } else {
                    audioRef.current.volume += currentVolume < targetVolume ? 0.01 : -0.01;
                }
            }, 50);

            return () => clearInterval(faderId);
        }
    }, [activePlanetIndex, isPlaying]);

    // Initial browser interaction listener to unlock the Web Audio capabilities
    useEffect(() => {
        const handleInteraction = () => {
            if (!hasInteracted && audioRef.current) {
                audioRef.current.volume = 0.15; // Lowest base
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    setHasInteracted(true);
                }).catch(err => {
                    console.error("Chromium/Webkit blocked proactive autoplay. Need rigid DOM interaction flag.", err);
                });
            }
        };

        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('scroll', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });
        // Bonus fallback to any mousewheel tick
        window.addEventListener('wheel', handleInteraction, { once: true });

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('wheel', handleInteraction);
        };
    }, [hasInteracted]);

    const toggleMute = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().catch(console.error);
                setIsPlaying(true);
            }
        }
    };

    return (
        <div className="pointer-events-auto">
            <audio ref={audioRef} src="/audio/space-ambient.mp3" loop preload="auto" />

            <button
                onClick={toggleMute}
                className="fixed bottom-6 right-6 z-50 p-4 bg-space-800/80 backdrop-blur-md border border-white/20 rounded-full text-gray-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all shadow-2xl hover:bg-space-700 pointer-events-auto cursor-pointer"
                aria-label={isPlaying ? "Mute Cosmic Web" : "Activate Local Space Drone"}
            >
                {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>
        </div>
    );
}
