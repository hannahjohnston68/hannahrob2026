
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ 
  src, 
  alt = "", 
  className, 
  placeholder = "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=20&q=10", 
  ...rest 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && (
        <img 
          src={placeholder} 
          alt="Loading..." 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500 blur-md",
            className
          )}
        />
      )}
      <img
        src={error ? placeholder : src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          !isLoaded && "opacity-0",
          isLoaded && "opacity-100",
          className
        )}
        onLoad={() => setIsLoaded(true)}
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
