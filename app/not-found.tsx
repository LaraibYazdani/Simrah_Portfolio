import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap notfound">
      <span className="kicker kicker--accent">Page 404</span>
      <h1 className="display">Spiked.</h1>
      <p>This page didn’t make it into the issue.</p>
      <p>
        <Link href="/#contents">Back to the contents →</Link>
      </p>
    </div>
  );
}
