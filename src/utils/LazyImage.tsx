import { useState } from 'react';
import SkeletonLoader from '@/SkeletonLoader';
import useWindowWidth from './useWindowWidth';

interface LazyImageProps {
  src: string;
  alt?: string;
  /** Desired desktop width in px */
  width: number;
  height: number;
  className?: string;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
}: LazyImageProps) {
  const windowWidth = useWindowWidth();
  const [loaded, setLoaded] = useState(false);

  // If mobile, stretch to 100%; otherwise cap at `width` px
  const displayWidth =
    windowWidth < 768 ? '100%' : `${width}px`;

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{
        width: displayWidth,
        maxWidth: `${width}px`,
        height: `${height}px`,
      }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* full width skeleton on mobile; capped on desktop */}
          <SkeletonLoader
            style={{
              width: displayWidth,
              maxWidth: `${width}px`,
              height: `${height}px`,
            }}
          />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '100%',
          height: `${height}px`,
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
