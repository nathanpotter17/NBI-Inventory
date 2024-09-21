import { Inter_Tight } from "next/font/google";
import { FormEvent } from "react";

const geistSans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-it",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const seedDB = async () => {
  const response = await fetch(`http://localhost:3000/api/seedData`);
  const resp = await response.json();
  console.log(resp.message);
};

const searchStructure = async (sid: string) => {
  const response = await fetch(`http://localhost:3000/api/structure`, {
    method: "POST",
    body: sid,
  });
  const resp = await response.json();
  console.log(resp);
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
          seedDB();
        }}
      >
        Seed DB
      </button>
      <br></br>
      <h1 className="text-2xl font-semibold mt-4">Search by Structure ID</h1>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();

          const sid = (e.target as HTMLFormElement)
            .querySelector("input")
            ?.value.trim() as string;

          searchStructure(sid);
        }}
      >
        <input
          type="text"
          className="w-1/4 p-2 mt-2 border border-gray-300 rounded-md text-black"
          placeholder="Enter Structure ID"
        />
        <button
          type="submit"
          className="text-center w-auto max-w-[6rem] mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
