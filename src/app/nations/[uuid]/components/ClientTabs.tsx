"use client";

import React, { useState } from "react";
import clsx from "clsx";
import AboutTab from "./AboutTab";
import EconomyTab from "./EconomyTab";
import RelationsTab from "./RelationsTab";
import type { Nation, PaginatedResult, PartialTown } from "@/types/bridge";

interface ClientTabsProps {
  nation: Nation;
  towns: PaginatedResult<PartialTown>;
}

export function ClientTabs({ nation, towns }: ClientTabsProps) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <>
      <div role="tablist" className="tabs tabs-lifted">
        <a role="tab" className={clsx("tab", activeTab === "about" && "tab-active")} onClick={() => setActiveTab("about")}>
          About
        </a>
        <a role="tab" className={clsx("tab", activeTab === "economy" && "tab-active")} onClick={() => setActiveTab("economy")}>
          Economy
        </a>
        <a role="tab" className={clsx("tab", activeTab === "relations" && "tab-active")} onClick={() => setActiveTab("relations")}>
          Relations
        </a>
      </div>
      {activeTab === "about" && <AboutTab nation={nation} towns={towns} />}
      {activeTab === "economy" && <EconomyTab nation={nation} />}
      {activeTab === "relations" && <RelationsTab allies={nation.allies} enemies={nation.enemies} />}
    </>
  );
}
