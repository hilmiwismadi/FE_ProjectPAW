"use client";

import { Mahasiswa, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useState, useEffect, useMemo } from "react";

async function getMahasiswa(): Promise<Mahasiswa[]> {
  return [
    {
      id: "1",
      nama: "Dzaki Wismadi",
      nim: 497501,
      email: "dzakiwismadi@gmail.com",
      password: "capacitor Forint",
    },
    {
      id: "2",
      nama: "Jono Kartono",
      nim: 497569,
      email: "jonokart@gmail.com",
      password: "Apaan kek",
    },
    {
      id: "3",
      nama: "Alex Turner",
      nim: 497505,
      email: "Alexturner@gmail.com",
      password: "Balaclava",
    },
  ];
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Mahasiswa[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchData = await getMahasiswa();
      setData(fetchData);
    }
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((mahasiswa) => 
      mahasiswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mahasiswa.nim.toString().includes(searchTerm) ||
      mahasiswa.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, data]);

  return (
    <section className="mx-auto py-10 bg-white w-full aspect-[1920/1080] flex flex-col justify-center items-center gap-5">
      <div className="w-[80vw] h-8">
        <input 
          type="text"
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-full bg-slate-200 rounded cursor-pointer px-2 py-1 text-black"
        />
      </div>
      <div className="w-[80vw] text-black ">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </section>
  );
}
