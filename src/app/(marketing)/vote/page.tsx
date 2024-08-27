import { ExternalLink, Info } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vote",
};

export default async function Page() {
  const voteLinks = [
    { name: "Minecraft-MP", url: "https://minecraft-mp.com/server/334708/vote/" },
    { name: "Planet Minecraft", url: "https://www.planetminecraft.com/server/worldmc-6355473/vote/" },
    { name: "Minecraft Servers", url: "https://minecraftservers.org/vote/664730" },
    { name: "TopG", url: "https://topg.org/minecraft-servers/server-665790" },
  ];

  return (
    <section className="mx-auto max-w-screen-lg space-y-4">
      <h1 className="text-center text-5xl font-black">Vote</h1>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {voteLinks.map((link, index) => (
          <Link
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-block justify-between shadow"
            key={index}
          >
            {link.name}
            <ExternalLink />
          </Link>
        ))}
      </div>

      <div className="divider">How to Vote</div>

      <ol className="list-inside list-decimal">
        <li>Click on each voting link above</li>
        <li>Log in or enter your Minecraft username</li>
        <li>Complete the voting process on each site</li>
        <li>Return to the game to claim your rewards!</li>
      </ol>

      <div className="alert alert-info shadow">
        <Info />
        <span>Remember to vote on all 4 sites daily to maximize your rewards!</span>
      </div>
    </section>
  );
}
