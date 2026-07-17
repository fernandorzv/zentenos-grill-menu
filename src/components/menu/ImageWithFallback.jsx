import { useState } from 'react';

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallbackClassName,
  fallbackLabel,
  loading = 'lazy',
  decode = 'async',
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`zg-image-fallback ${fallbackClassName || ''}`} role="img" aria-label={alt}>
        {fallbackLabel ? <span>{fallbackLabel}</span> : null}
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      decoding={decode}
      onError={() => setFailed(true)}
    />
  );
}
