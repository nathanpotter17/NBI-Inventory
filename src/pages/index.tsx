"use client";

import { Inter_Tight } from "next/font/google";
import { FormEvent, useState } from "react";

// (OPTIMIZATION) migrate to tanstack/table for better table support.
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const geistSans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-it",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface Location {
  id: number;
  STRUCTURE_NUMBER_008: string;
  DATE_OF_INSPECT_090: string;
  YEAR_BUILT_027: string;
  OPERATING_RATING_064: string;
}

export default function Home() {
  const [loc, setLoc] = useState<Location[]>([]);
  const [error, setError] = useState(false);

  const seedDB = async () => {
    const response = await fetch(`http://localhost:3000/api/seedData`);
    const resp = await response.json();
    console.log(resp.message);
  };

  const seedLocations = async () => {
    const response = await fetch(`http://localhost:3000/api/mapLocation`);
    const resp = await response.json();
    console.log(resp.message);
  };

  const searchStructures = async (sid: string) => {
    const response = await fetch(`http://localhost:3000/api/structure`, {
      method: "POST",
      body: sid,
    });
    const resp = await response.json();
    console.log(resp);
  };

  const searchLocation = async (lat: string, long: string) => {
    const response = await fetch(`http://localhost:3000/api/location`, {
      method: "POST",
      body: JSON.stringify({ lat, long }),
    });
    const resp = await response.json();

    if (resp.status === 404 || resp.length === 0 || resp.error) {
      console.log("No content found.");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }

    setLoc(resp);
  };

  return (
    <div
      className={`${geistSans.variable} flex flex-col min-h-screen w-full p-24 font-[family-name:var(--font-it)]`}
    >
      <h1 className="text-2xl font-semibold">
        Welcome to the Natl. Bridge Inventory - Pennsylvania
      </h1>
      <div className="flex flex-row gap-x-4">
        <button
          className="text-center w-auto max-w-[6rem] mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled
          onClick={() => {
            seedDB();
          }}
        >
          Seed DB
        </button>
        <button
          className="text-center w-auto max-w-[max-content] mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled
          onClick={() => {
            seedLocations();
          }}
        >
          Provide Location Data
        </button>
      </div>
      <br></br>
      <h1 className="text-2xl font-semibold mt-4">Search by Structure ID</h1>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();

          const sid = (e.target as HTMLFormElement)
            .querySelector("input")
            ?.value.trim() as string;

          searchStructures(sid);
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
      <br></br>
      <h1 className="text-2xl font-semibold mt-4">
        Search by Latitude and Longitude
      </h1>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();

          const frm = e.currentTarget as HTMLFormElement;

          const lat = (frm.elements.namedItem(
            "lat"
          ) as HTMLInputElement | null)!.value.trim();
          const long = (frm.elements.namedItem(
            "long"
          ) as HTMLInputElement | null)!.value.trim();

          searchLocation(lat, long);
        }}
      >
        <input
          type="text"
          id="lat"
          className="w-1/4 p-2 mt-2 border border-gray-300 rounded-md text-black"
          placeholder="Latitude"
        />
        <input
          type="text"
          id="long"
          className="w-1/4 p-2 mt-2 border border-gray-300 rounded-md text-black"
          placeholder="Longitude"
        />
        <button
          type="submit"
          className="text-center w-auto max-w-[6rem] mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 text-md mt-4">No content found.</p>}
      <br></br>
      <h1 className="text-2xl font-semibold mt-4">Search Results</h1>
      <div className="flex flex-row w-full h-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bridge ID</TableHead>
              <TableHead>Structure Number</TableHead>
              <TableHead>Date of Inspection</TableHead>
              <TableHead>Year Built</TableHead>
              <TableHead>Operating Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loc.map((loc, index) => (
              <TableRow key={index}>
                <TableCell>{loc.id || "-"}</TableCell>
                <TableCell>{loc.STRUCTURE_NUMBER_008 || "-"}</TableCell>
                <TableCell>{loc.DATE_OF_INSPECT_090 || "-"}</TableCell>
                <TableCell>{loc.YEAR_BUILT_027 || "-"}</TableCell>
                <TableCell>{loc.OPERATING_RATING_064 || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
