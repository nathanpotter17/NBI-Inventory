import { Inter_Tight } from "next/font/google";

const geistSans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-it",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} flex min-h-screen w-full font-[family-name:var(--font-it)]`}
    >
      <h1 className="text-2xl font-semibold">Welcome to the NBI Inventory</h1>
    </div>
  );
}
