'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [isEnded, setIsEnded] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);

  // Sync state on mount
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay configuration
    if (!shouldReduceMotion) {
      video.muted = true;
      video.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Autoplay blocked by browser policy:', err);
        });
    }

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [shouldReduceMotion]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      setIsEnded(false);
      // If unmuting for first active play, start from beginning as an intro
      if (isMuted) {
        video.muted = false;
        setIsMuted(false);
        video.currentTime = 0;
      }
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const restartVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsEnded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      togglePlay();
    }
  };

  return (
    <div
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={() => togglePlay()}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Kishore Biradar introduction video. Press Space or Enter to play/pause."
      className={cn(
        "relative w-full max-w-md sm:max-w-lg aspect-video rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-card group cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all duration-300",
        showControls ? "border-violet-500/30" : ""
      )}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src="/hero-avatar.mp4"
        poster="/profile.png"
        preload="metadata"
        playsInline
        loop={isMuted} // Loop only when acting as a muted background teaser
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
      />

      {/* Subtle overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Dynamic play overlay (teaser overlay when muted background is running) */}
      {isMuted && !isEnded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/35 transition-colors duration-300">
          <div className="p-4 rounded-full bg-violet-600/90 text-white shadow-lg backdrop-blur-xs scale-90 group-hover:scale-100 transition-all duration-300">
            <Play className="h-6 w-6 fill-white ml-0.5" />
          </div>
          <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-widest text-white/80 bg-black/45 px-2.5 py-1 rounded-md backdrop-blur-xs">
            Click to Play with Sound
          </span>
        </div>
      )}

      {/* Controls Overlay */}
      <div
        className={cn(
          "absolute bottom-0 inset-x-0 p-4 space-y-2 flex flex-col justify-end transition-opacity duration-300",
          showControls || !isPlaying || isEnded ? "opacity-100" : "opacity-0"
        )}
        onClick={(e) => e.stopPropagation()} // Prevent controls clicks from pausing
      >
        {/* Progress track */}
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            {isEnded ? (
              <button
                onClick={restartVideo}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Replay video"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => togglePlay()}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white" />}
              </button>
            )}

            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">
            {isEnded ? 'Ended' : isMuted ? 'Previewing' : 'Playing'}
          </span>
        </div>
      </div>
    </div>
  );
}
