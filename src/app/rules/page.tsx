import React from "react";
import { Book, Users, Map, Info, AlertTriangle } from "lucide-react";

export default function RulesPage() {
    const ruleCategories = [
        {
            title: "Cheating and Exploits",
            icon: <AlertTriangle className="size-6 text-red-500" />,
            rules: [
                "Cheat clients and unfair modifications are prohibited.",
                "Exploiting bugs or glitches is not allowed.",
                "Alternative accounts are forbidden.",
                "Intentionally causing lag or disrupting server services is banned.",
            ],
        },
        {
            title: "Behavior and Chat",
            icon: <Users className="size-6 text-blue-500" />,
            rules: [
                "Use appropriate names for nations, towns, and player accounts.",
                "Raiding and stealing is allowed, but protect your assets.",
                "No spamming or disruptive behavior in chat.",
                "Bullying, hate speech, and explicit content are prohibited.",
                "Do not impersonate other players or entities.",
                "AFK time is limited to 15 minutes.",
                "Respect others' personal information and privacy.",
                "Use English in global chat channels.",
            ],
        },
        {
            title: "Griefing and Land Management",
            icon: <Map className="size-6 text-green-500" />,
            rules: [
                "Do not damage land within or around claims.",
                "Griefing in wilderness is allowed, but may be rolled back.",
                "Follow town claiming rules to ensure fair expansion.",
                "Major terraforming that alters the world map is not allowed.",
                "Map art is permitted but must follow content guidelines.",
            ],
        },
    ];

    return (
        <section className="space-y-4">
            <h1 className="text-5xl font-black">Rules</h1>

            <div className="alert alert-info">
                <Info className="size-5" />
                <span>These rules ensure a fair and enjoyable experience for all players. Please read them carefully!</span>
            </div>

            {ruleCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                    <div className="flex items-center gap-2 mb-2">
                        {category.icon}
                        <h2 className="text-2xl font-bold">
                            {category.title}
                        </h2>
                    </div>
                    <ul className="list-none space-y-2">
                        {category.rules.map((rule, ruleIndex) => (
                            <li key={ruleIndex} className="flex">
                                <span className="font-bold mr-2">{`${categoryIndex + 1}.${ruleIndex + 1}`}</span>
                                <span>{rule}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            
            <div className="alert alert-warning">
                <Book className="size-5" />
                <span>Remember: WorldMC staff has the final say in rule interpretation and enforcement. Play responsibly and have fun!</span>
            </div>
        </section>
    );
}