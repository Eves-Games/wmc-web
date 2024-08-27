import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer border-t p-10">
      <aside>
        <Image src={"/worldmc.png"} alt="WorldMC Icon" className="size-12" width={100} height={100} />
        <p>
          Eve&apos;s Games SP.
          <br />
          <i>Illustrating the Corruption of the Natural World.</i>
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">WorldMC</h6>
        <Link href="/" className="link-hover link">
          Home
        </Link>
        <Link href="https://discord.gg/g4stgqxahv" target="_blank" className="link-hover link">
          Discord
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <Link href="https://eves.gg" className="link-hover link">
          Eve&apos;s Games
        </Link>
        <Link href="https://eves.gg" className="link-hover link">
          Careers and Commissions
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <Link href="/terms-of-service" className="link-hover link">
          Terms of Service
        </Link>
        <Link href="/privacy-policy" className="link-hover link">
          Privacy Policy
        </Link>
      </nav>
    </footer>
  );
}
