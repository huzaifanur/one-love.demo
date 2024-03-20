import React, { useState, useEffect } from 'react';

interface CollageImage {
  src: string;
  alt: string;
}

interface ImageStyles {
  transform: string;
  zIndex: number;
}

function ScatteredCollage({ images }: { images: CollageImage[] }) {
  const [styles, setStyles] = useState<Record<number, ImageStyles>>({});

  useEffect(() => {
    const randomizeStyles = () => {
      const newStyles: Record<number, ImageStyles> = {}; // Type the styles object
      images.forEach((_, index) => {
        newStyles[index] = {
          transform: `translate(${randomOffset()}px, ${randomOffset()}px) rotate(${randomRotation()}deg)`,
          zIndex: Math.floor(Math.random() * images.length),
        };
      });
      setStyles(newStyles);
    };

    randomizeStyles();
  }, [images]);

  const randomOffset = () => Math.floor(Math.random() * 50) - 25; 
  const randomRotation = () => Math.floor(Math.random() * 20) - 10; 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">  
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className="w-full h-auto rounded-md shadow-md transform transition-transform hover:scale-105" 
          style={styles[index]}
        />
      ))}
    </div>
  );
}

export default ScatteredCollage;
