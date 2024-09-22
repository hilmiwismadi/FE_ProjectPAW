"use client";

import { Mahasiswa, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import axios from "axios";

async function getMahasiswa(): Promise<Mahasiswa[]> {
  try {
    const response = await axios.get("http://localhost:3000/mahasiswa");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    return [];
  }
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
    return data.filter((mahasiswa) => {
      const name = mahasiswa.name ? mahasiswa.name.toLowerCase() : "";
      const email = mahasiswa.email ? mahasiswa.email.toLowerCase() : "";
      const nim = mahasiswa.nim ? mahasiswa.nim.toString() : "";
  
      return (
        name.includes(searchTerm.toLowerCase()) ||
        nim.includes(searchTerm) ||
        email.includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, data]);

  return (
    <section className="mx-auto py-10 bg-white w-full aspect-[1920/1080] flex flex-col justify-center items-center gap-5">
      <div className="w-[80vw] h-8 relative flex justify-center items-center">
        <input 
          type="text"
          placeholder="Search Mahasiswa ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-full bg-slate-200 rounded cursor-pointer px-2 py-1 text-black"
        />
        <Image src={"/searchIcon.png"} width={16} height={16} alt="search icon" className="absolute right-4 cursor-pointer" />
      </div>
      <div className="w-[80vw] text-black ">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </section>
  );
}
