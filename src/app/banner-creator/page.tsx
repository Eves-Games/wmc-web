"use client";

import Image from "next/image";
import { colours, bannerPatterns, getSmallPatternPosition, generateBanner, ColouredPattern } from "@/banners";
import { useCallback, useState } from "react";
import clsx from "clsx";
import MinecraftItem from "@/components/minecraft/MinecraftItem";

const handleColourChange = (setFunc: Function, activeTab: string) => (colour: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  setFunc((prev: any) => (activeTab === "base" ? colour : { ...prev, colour }));
};

const handlePatternChange = (setFunc: Function) => (pattern: string | null) => (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  setFunc((prev: any) => (!pattern ? null : { name: pattern, colour: prev?.colour || "black-dye" }));
};

const handleTabChange = (setFunc: Function) => (tab: "base" | "primary" | "secondary") => {
  setFunc(tab);
};

export default function Page() {
  const [baseColour, setBaseColour] = useState<string>("white-dye");
  const [primary, setPrimary] = useState<ColouredPattern | null>(null);
  const [secondary, setSecondary] = useState<ColouredPattern | null>(null);
  const [activeTab, setActiveTab] = useState<"base" | "primary" | "secondary">("base");

  const handleBaseColourChange = useCallback(handleColourChange(setBaseColour, activeTab), [activeTab]);
  const handlePrimaryColourChange = useCallback(handleColourChange(setPrimary, activeTab), [activeTab, primary]);
  const handleSecondaryColourChange = useCallback(handleColourChange(setSecondary, activeTab), [activeTab, secondary]);
  const handlePrimaryPatternChange = useCallback(handlePatternChange(setPrimary), []);
  const handleSecondaryPatternChange = useCallback(handlePatternChange(setSecondary), []);
  const handleActiveTabChange = useCallback(handleTabChange(setActiveTab), []);

  return (
    <section className="space-y-4 text-center">
      <h1 className="text-5xl font-black">Banner Creator</h1>
      <div className="flex flex-col items-center space-y-4">
        <div role="tablist" className="tabs tabs-lifted tabs-lg">
          <button role="tab" className={clsx("tab", activeTab === "base" && "tab-active")} onClick={() => handleActiveTabChange("base")}>
            Base
          </button>
          <button
            role="tab"
            className={clsx("tab", activeTab === "primary" && "tab-active")}
            onClick={() => handleActiveTabChange("primary")}
          >
            Primary
          </button>
          <button
            role="tab"
            className={clsx("tab", activeTab === "secondary" && "tab-active")}
            onClick={() => handleActiveTabChange("secondary")}
          >
            Secondary
          </button>
        </div>
        {generateBanner(baseColour, primary, secondary)}
        <ColourButtons
          handleColourChange={
            activeTab === "base"
              ? handleBaseColourChange
              : activeTab === "primary"
                ? handlePrimaryColourChange
                : handleSecondaryColourChange
          }
        />
        <PatternButtons
          activeTab={activeTab}
          handlePatternChange={activeTab === "primary" ? handlePrimaryPatternChange : handleSecondaryPatternChange}
        />
      </div>
    </section>
  );
}

interface ColourButtonsProps {
  handleColourChange: (colour: string) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ColourButtons({ handleColourChange }: ColourButtonsProps) {
  return (
    <div className="grid w-fit grid-cols-8 gap-2">
      {colours.map((colour) => (
        <button key={colour.name} className="btn btn-square" onClick={handleColourChange(colour.name)}>
          <MinecraftItem imageSrc={colour.imageSrc} className="size-12" />
        </button>
      ))}
    </div>
  );
}

interface PatternButtonsProps {
  activeTab: "base" | "primary" | "secondary";
  handlePatternChange: (pattern: string | null) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function PatternButtons({ activeTab, handlePatternChange }: PatternButtonsProps) {
  return (
    <div className={clsx("grid grid-cols-10 place-items-center gap-2", activeTab === "base" && "hidden")}>
      {bannerPatterns.map((pattern) => (
        <button key={pattern.name} className="btn btn-square" onClick={handlePatternChange(pattern.name)}>
          <div className="border-2 border-neutral">
            <div
              className="banner-sm bg-white"
              style={{
                backgroundImage: "url(/minecraft/banner-patterns-sm.png)",
                backgroundPosition: getSmallPatternPosition(pattern.name),
              }}
            />
          </div>
        </button>
      ))}
      <button className="btn btn-square" onClick={handlePatternChange(null)}>
        <div className="border-2 border-neutral">
          <div className="banner-sm bg-white" />
        </div>
      </button>
    </div>
  );
}
