"use client";

import React, { useRef, useEffect } from "react";

interface MinecraftItemProps {
  imageSrc: string;
  className?: string;
}

const MinecraftItem: React.FC<MinecraftItemProps> = ({ imageSrc, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  return <canvas ref={canvasRef} className={className} style={{ imageRendering: "pixelated" }} />;
};

export default MinecraftItem;
