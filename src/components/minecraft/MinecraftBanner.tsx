"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type MinecraftColor =
  | "WHITE"
  | "ORANGE"
  | "MAGENTA"
  | "LIGHT_BLUE"
  | "YELLOW"
  | "LIME"
  | "PINK"
  | "GRAY"
  | "LIGHT_GRAY"
  | "CYAN"
  | "PURPLE"
  | "BLUE"
  | "BROWN"
  | "GREEN"
  | "RED"
  | "BLACK";

const colorMap: Record<MinecraftColor, [number, number, number]> = {
  WHITE: [255, 255, 255],
  ORANGE: [216, 127, 51],
  MAGENTA: [178, 76, 216],
  LIGHT_BLUE: [102, 153, 216],
  YELLOW: [229, 229, 51],
  LIME: [127, 204, 25],
  PINK: [242, 127, 165],
  GRAY: [76, 76, 76],
  LIGHT_GRAY: [153, 153, 153],
  CYAN: [76, 127, 153],
  PURPLE: [127, 63, 178],
  BLUE: [51, 76, 178],
  BROWN: [102, 76, 51],
  GREEN: [102, 127, 51],
  RED: [153, 51, 51],
  BLACK: [25, 25, 25],
};

interface MinecraftBannerProps {
  type: string;
  patterns:
    | {
        pattern: string;
        color: string;
      }[]
    | null;
  className?: string;
}

const MinecraftBanner: React.FC<MinecraftBannerProps> = React.memo((bannerData: MinecraftBannerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderBanner = useMemo(() => {
    return async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 20;
      canvas.height = 40;
      ctx.imageSmoothingEnabled = false;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const baseColor = bannerData.type.split("_")[0] as MinecraftColor;
      const baseColorRGB = colorMap[baseColor] || [255, 255, 255];

      await drawLayer(ctx, "/minecraft/entity/banner/base.png", baseColorRGB);

      if (bannerData.patterns) {
        for (const pattern of bannerData.patterns) {
          const patternColorRGB = colorMap[pattern.color as MinecraftColor] || [255, 255, 255];
          await drawLayer(ctx, `/minecraft/entity/banner/${pattern.pattern.toLowerCase()}.png`, patternColorRGB);
          console.log(`Pattern ${pattern.pattern} drawn with color ${patternColorRGB}`);
        }
      }
    };
  }, [bannerData]);

  useEffect(() => {
    renderBanner();
  }, [renderBanner]);

  return <canvas ref={canvasRef} className={twMerge("h-16 w-8", bannerData.className)} style={{ imageRendering: "pixelated" }} />;
});

async function drawLayer(ctx: CanvasRenderingContext2D, imageSrc: string, color: [number, number, number]) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Create a temporary canvas to handle the coloring
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = ctx.canvas.width;
      tempCanvas.height = ctx.canvas.height;
      const tempCtx = tempCanvas.getContext("2d");

      if (tempCtx) {
        // Draw the image on the temporary canvas
        tempCtx.drawImage(img, 1, 1, 20, 40, 0, 0, 20, 40);

        // Apply color
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
          imageData.data[i] = (imageData.data[i] * color[0]) / 255;
          imageData.data[i + 1] = (imageData.data[i + 1] * color[1]) / 255;
          imageData.data[i + 2] = (imageData.data[i + 2] * color[2]) / 255;
        }
        tempCtx.putImageData(imageData, 0, 0);

        // Draw the result on the main canvas
        ctx.drawImage(tempCanvas, 0, 0);
      }

      resolve();
    };
    img.onerror = (e) => {
      console.error("Error loading image:", imageSrc, e);
      reject(e);
    };
    img.src = imageSrc;
  });
}

MinecraftBanner.displayName = "MinecraftBanner";

export default MinecraftBanner;
