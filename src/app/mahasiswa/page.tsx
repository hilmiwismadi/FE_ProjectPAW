import { Mahasiswa, columns } from "./columns";
import { DataTable } from "@/components/data-table";

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
    {
      id: "4",
      nama: "Jimmy Butler",
      nim: 497522,
      email: "Jimmyb23@gmail.com",
      password: "heatculture",
    },
    {
      id: "5",
      nama: "Chris Hemsworth",
      nim: 497530,
      email: "chris.hems@gmail.com",
      password: "GodofThunder",
    },
    {
      id: "6",
      nama: "Michael Jordan",
      nim: 497540,
      email: "mjordan23@gmail.com",
      password: "BullsDynasty",
    },
    {
      id: "7",
      nama: "Elon Musk",
      nim: 497550,
      email: "elonm@gmail.com",
      password: "spacexMars",
    },
    {
      id: "8",
      nama: "Taylor Swift",
      nim: 497555,
      email: "tswift@gmail.com",
      password: "Lover1989",
    },
    {
      id: "9",
      nama: "Robert Downey",
      nim: 497560,
      email: "rdj@gmail.com",
      password: "IronMan",
    },
    {
      id: "10",
      nama: "Scarlett Johansson",
      nim: 497565,
      email: "scarlettj@gmail.com",
      password: "BlackWidow",
    },
    {
      id: "11",
      nama: "Lebron James",
      nim: 497570,
      email: "lebronjames@gmail.com",
      password: "KingJames",
    },
    {
      id: "12",
      nama: "Kanye West",
      nim: 497575,
      email: "kanye@gmail.com",
      password: "YeezyBoost",
    },
    {
      id: "13",
      nama: "Emma Watson",
      nim: 497580,
      email: "emmaw@gmail.com",
      password: "HermioneMagic",
    },
    {
      id: "14",
      nama: "Tom Holland",
      nim: 497585,
      email: "tomholland@gmail.com",
      password: "SpiderMan",
    },
    {
      id: "15",
      nama: "Natalie Portman",
      nim: 497590,
      email: "natalie@gmail.com",
      password: "MightyThor",
    },
    {
      id: "16",
      nama: "Lionel Messi",
      nim: 497595,
      email: "lmessi10@gmail.com",
      password: "GOAT",
    },
  ];
}

export default async function Page() {
  const data = await getMahasiswa();

  return (
    <section className="mx-auto py-10 bg-white w-full aspect-[1920/1080] flex flex-col justify-center items-center">
      <div className="w-[80vw] text-black ">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
