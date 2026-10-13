import React, { useEffect, useRef, useState } from 'react';

interface ScrollDrivenHeroVideoProps {
  videoUrl?: string;
  fallbackImage: string;
  alt: string;
  className?: string;
}

const DEFAULT_VIDEO_URL =
  'https://res.cloudinary.com/dpeqgssr9/video/upload/v1791844324/barrie_freyre_typing_at_workstation_20261012170125_fbacak.mp4';

export function ScrollDrivenHeroVideo({
  videoUrl = DEFAULT_VIDEO_URL,
  fallbackImage,
  alt,
  className = '',
}: ScrollDrivenHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [duration, setDuration] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Velocity-driven smooth native playback engine
  useEffect(() => {
    if (prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video || !videoLoaded || duration <= 0) return;

    let rafId: number;
    let velocity = 0;
    let lastScrollY = window.scrollY || window.pageYOffset || 0;
    let lastScrollTime = performance.now();
    let isVisible = true;

    // Visibility observer to avoid unnecessary playback off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const onScroll = () => {
      if (!isVisible) return;

      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const now = performance.now();
      const timeDelta = Math.max(now - lastScrollTime, 16);
      const deltaY = currentScrollY - lastScrollY;

      lastScrollY = currentScrollY;
      lastScrollTime = now;

      const heroEl = document.getElementById('top');
      const maxScroll = Math.max(window.innerHeight * 0.8, heroEl?.offsetHeight || 600);
      const progress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);
      const targetTime = progress * (duration - 0.1);

      // Scrolling downwards: apply forward momentum
      if (deltaY > 0) {
        // Compute speed factor based on scroll speed
        const speed = (deltaY / timeDelta) * 1.5;
        velocity = Math.min(Math.max(velocity + speed, 0.8), 2.5);

        // Ensure video is playing with native hardware decoder
        if (video.paused && video.currentTime < duration - 0.1) {
          video.play().catch(() => {});
        }
      } else if (deltaY < 0) {
        // Scrolling upwards: smoothly rewind towards target position
        velocity = 0;
        if (!video.paused) video.pause();

        // Smoothly adjust backwards towards target time without decoder choking
        const step = (targetTime - video.currentTime) * 0.25;
        if (Math.abs(step) > 0.02) {
          video.currentTime = Math.max(0, Math.min(video.currentTime + step, duration - 0.05));
        } else {
          video.currentTime = Math.max(0, targetTime);
        }
      }

      // If user reaches top of page, reset cleanly to first frame
      if (currentScrollY <= 5) {
        velocity = 0;
        if (!video.paused) video.pause();
        video.currentTime = 0;
      }
    };

    // Main 60fps animation loop for velocity decay & smooth playbackRate
    const tick = () => {
      if (isVisible && velocity > 0.04) {
        // Bound check: if reached end of video, pause gently
        if (video.currentTime >= duration - 0.1) {
          velocity = 0;
          if (!video.paused) video.pause();
        } else {
          // Keep hardware decoder smooth
          if (video.paused) {
            video.play().catch(() => {});
          }
          video.playbackRate = Math.min(Math.max(velocity, 0.6), 2.5);
          // Friction decay to decelerate gently when scroll stops
          velocity *= 0.91;
        }
      } else if (velocity <= 0.04 && velocity > 0) {
        velocity = 0;
        if (!video.paused) {
          video.pause();
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      if (video && !video.paused) {
        video.pause();
      }
    };
  }, [videoLoaded, duration]);

  const handleLoadedMetadata = () => {
    if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
      setVideoLoaded(true);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden flex items-end justify-center bg-[#242424] ${className}`}
    >
      {/* Native HTML5 Video element */}
      {!prefersReducedMotion && !videoError && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          role="img"
          crossOrigin="anonymous"
          onLoadedMetadata={handleLoadedMetadata}
          onError={() => setVideoError(true)}
          className={`w-full h-[82%] md:h-[86%] lg:h-[85%] object-cover object-top grayscale contrast-125 transition-opacity duration-300 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label={alt}
        />
      )}

      {/* Fallback portrait image shown during load, on network error, or when reduced motion is preferred */}
      {(prefersReducedMotion || !videoLoaded || videoError) && (
        <img
          src={fallbackImage}
          alt={alt}
          referrerPolicy="no-referrer"
          className="absolute inset-x-0 bottom-0 w-full h-[82%] md:h-[86%] lg:h-[85%] object-cover object-top grayscale contrast-125"
        />
      )}
    </div>
  );
}
