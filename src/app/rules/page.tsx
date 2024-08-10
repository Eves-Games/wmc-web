import React from "react";
import { Book } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules",
};

export default function RulesPage() {
  const ruleCategories = [
    {
      title: "Cheating and Exploits",
      rules: [
        "Cheat clients and unfair modifications are prohibited.",
        "Exploiting bugs or glitches is not allowed.",
        "Alternative accounts are forbidden.",
        "Intentionally causing lag or disrupting server services is banned.",
      ],
    },
    {
      title: "Behavior and Chat",
      rules: [
        "Use appropriate names for nations, towns, and player accounts.",
        "Raiding and stealing is allowed, but protect your assets.",
        "No spamming or disruptive behavior in chat.",
        "Bullying, hate speech, and explicit content are prohibited.",
        "Do not impersonate other players or entities.",
        "Respect others' personal information and privacy.",
        "Use English in global chat channels.",
      ],
    },
    {
      title: "Griefing and Land Management",
      rules: [
        "Griefing and stealing within your own town or nation is not allowed.",
        "Do not damage land within or around claims.",
        "Griefing in wilderness is allowed, but may be rolled back.",
        "Follow town claiming rules to ensure fair expansion.",
        "Major terraforming that alters the world map is not allowed.",
        "Map art is permitted but must follow content guidelines.",
      ],
    },
  ];

  const getMarkerContent = (categoryIndex: number, ruleIndex: number) => {
    return `${categoryIndex + 1}.${ruleIndex + 1}`;
  };

  return (
    <section className="space-y-4">
      <h1 className="text-5xl font-black">Rules</h1>

      {ruleCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-2">
          <h2 className="text-2xl font-bold">
            {categoryIndex + 1}. {category.title}
          </h2>
          <ol className="list-none space-y-1">
            {category.rules.map((rule, ruleIndex) => (
              <li
                key={ruleIndex}
                className="relative pl-8"
                style={{
                  counterIncrement: "item",
                  counterReset: ruleIndex === 0 ? "item" : "none",
                }}
              >
                <span
                  className="absolute left-0"
                  style={{
                    content: `"${getMarkerContent(categoryIndex, ruleIndex)}"`,
                  }}
                >
                  {getMarkerContent(categoryIndex, ruleIndex)}
                </span>
                {rule}
              </li>
            ))}
          </ol>
        </div>
      ))}

      <div className="alert alert-warning">
        <Book />
        <span>Remember: WorldMC staff has the final say in rule interpretation and enforcement. Play responsibly and have fun!</span>
      </div>
    </section>
  );
}
