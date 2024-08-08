"use client";

import React, { useRef, useEffect, useMemo } from "react";

interface MinecraftItemProps {
  imageSrc: string;
  className?: string;
}

const MinecraftItem: React.FC<MinecraftItemProps> = React.memo(({ imageSrc, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const memoizedEffect = useMemo(() => {
    return () => {
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
    };
  }, [imageSrc]);

  useEffect(() => {
    memoizedEffect();
  }, [memoizedEffect]);

  return <canvas ref={canvasRef} className={className} style={{ imageRendering: "pixelated" }} />;
});

MinecraftItem.displayName = "MinecraftItem";

export default MinecraftItem;
