import { useState } from 'react';
import SkeletonLoader from '@/SkeletonLoader';

interface LazyImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
}

export function LazyImage({ src, alt, width, height, className }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{ width, height }}
    >
      {!loaded && (
        <div className="absolute inset-0">
          <SkeletonLoader className={`w-[${width}px] h-[${height}px]`} />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className} ${
          loaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
