
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ 
  src, 
  alt = "", 
  className, 
  placeholder = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", // Using a tiny transparent GIF
  ...rest 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={error ? placeholder : src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          !isLoaded && "opacity-0",
          isLoaded && "opacity-100",
          className
        )}
        onLoad={() => {
          setIsLoaded(true);
          setError(false);
        }}
        onError={() => {
          setError(true);
          setIsLoaded(true);
        }}
        {...rest}
      />
    </div>
  );
};

export default ImageWithLoader;
