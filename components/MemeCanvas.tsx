import React, { useRef, useEffect, forwardRef } from 'react';
import { MemeTemplate } from '../types';

interface MemeCanvasProps {
  template: MemeTemplate;
  topText: string;
  bottomText: string;
}

const MemeCanvas = forwardRef<HTMLCanvasElement, MemeCanvasProps>(
  ({ template, topText, bottomText }, ref) => {
    const internalRef = useRef<HTMLCanvasElement>(null);
    const canvasRef = (ref || internalRef) as React.RefObject<HTMLCanvasElement>;

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = template.url;
      
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const canvasWidth = canvas.parentElement?.clientWidth || 500;
        const canvasHeight = canvasWidth / aspectRatio;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Text styling
        const fontSize = canvas.width / 12;
        ctx.font = `${fontSize}px Anton, sans-serif`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = fontSize / 15;
        ctx.textAlign = 'center';
        // FIX: Property 'textTransform' does not exist on type 'CanvasRenderingContext2D'.
        // The text is converted to uppercase manually before being drawn.

        const x = canvas.width / 2;
        
        // Draw top text
        const topY = fontSize * 1.2;
        ctx.strokeText(topText.toUpperCase(), x, topY);
        ctx.fillText(topText.toUpperCase(), x, topY);
        
        // Draw bottom text
        const bottomY = canvas.height - (fontSize * 0.4);
        ctx.strokeText(bottomText.toUpperCase(), x, bottomY);
        ctx.fillText(bottomText.toUpperCase(), x, bottomY);
      };

      img.onerror = () => {
          console.error("Failed to load meme template image.");
          ctx.fillStyle = 'black';
          ctx.fillRect(0,0, canvas.width, canvas.height);
          ctx.fillStyle = 'white';
          ctx.font = '20px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText("Error loading image", canvas.width / 2, canvas.height / 2);
      }
    }, [template, topText, bottomText, canvasRef]);

    return <canvas ref={canvasRef} className="w-full h-auto" />;
  }
);

MemeCanvas.displayName = 'MemeCanvas';

export default MemeCanvas;