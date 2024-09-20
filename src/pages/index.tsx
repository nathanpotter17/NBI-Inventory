import { Inter_Tight } from "next/font/google";

const geistSans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-it",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const sendData = async () => {
  const response = await fetch(`http://localhost:3000/api/seedData`);
  const resp = await response.json();
  console.log(resp.message);
};

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} flex flex-col min-h-screen w-full p-24 font-[family-name:var(--font-it)]`}
    >
      <h1 className="text-2xl font-semibold">
        Welcome to the Natl. Bridge Inventory - Pennsylvania
      </h1>
      <button
        className="text-center w-auto max-w-[6rem] mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => {
          sendData();
        }}
      >
        Seed DB
      </button>
    </div>
  );
}
