import { ExternalLink, Gift, Info, Trophy, Award, Crown } from "lucide-react";
import Link from "next/link";

export default async function Page() {
    const voteLinks = [
        { name: "Minecraft-MP", url: "https://minecraft-mp.com/vote-for-server/your-server-id" },
        { name: "Planet Minecraft", url: "https://planetminecraft.com/server/your-server/vote/" },
        { name: "Minecraft Servers", url: "https://minecraftservers.org/vote/your-server-id" },
        { name: "TopG", url: "https://topg.org/minecraft-servers/server-your-server-id" },
    ];

    const milestones = [
        { votes: 100, reward: "64 Gold", icon: <Gift className="size-8 text-amber-500" /> },
        { votes: 200, reward: "8 Netherite", icon: <Award className="size-8 text-purple-500" /> },
        { votes: 400, reward: "1 Elytra", icon: <Crown className="size-8 text-blue-500" /> },
        { votes: 800, reward: "Owner's Secret", icon: <Trophy className="size-8 text-green-500" /> },
    ];

    return (
        <section className="space-y-4">
            <h1 className="text-5xl font-black text-center">Vote</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {voteLinks.map((link, index) => (
                    <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-lg btn-block justify-between shadow"
                        key={index}
                    >
                        {link.name}
                        <ExternalLink className="size-5" />
                    </Link>
                ))}
            </div>

            <div className="divider">How to Vote</div>

            <ol className="list-decimal list-inside">
                <li>Click on each voting link above</li>
                <li>Log in or enter your Minecraft username</li>
                <li>Complete the voting process on each site</li>
                <li>Return to the game to claim your rewards!</li>
            </ol>

            <div className="alert alert-info">
                <Info className="size-5" />
                <span>Remember to vote on all 4 sites daily to maximize your rewards!</span>
            </div>

            <div className="divider">Voting Milestones</div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {milestones.map((milestone, index) => (
                    <div key={index} className="card bg-base-200 shadow">
                        <div className="card-body items-center text-center">
                            {milestone.icon}
                            <h2 className="card-title">{milestone.votes} Votes</h2>
                            <p>{milestone.reward}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}