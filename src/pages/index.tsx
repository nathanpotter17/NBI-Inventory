import { Inter_Tight } from "next/font/google";

const geistSans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-it",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface Landmark {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const sendData = async () => {
  const data: Landmark = {
    id: "123",
    name: "Burj Khalifa",
    latitude: 25.1972,
    longitude: 55.2744,
  };

  const response = await fetch(`http://localhost:3000/api/seedData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resp = await response.json();
  console.log(resp);
};

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} flex flex-col min-h-screen w-full p-24 font-[family-name:var(--font-it)]`}
    >
      <h1 className="text-2xl font-semibold">Welcome to the NBI Inventory</h1>
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
