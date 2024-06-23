"use client";
import {
  CountryPicker,
  DatePicker,
  GenderPicker,
  LifeYears,
  TimeFramePicker,
} from "@/components";
import { Country, TimeFrame } from "@/config/typeings";
import { calculateAge } from "@/config/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface LifeExpectancy {
  male: number;
  female: number;
  total: number;
}

interface CountryDetails {
  rank: number;
  name: "Philippines";
  lifeExpectancy: LifeExpectancy;
}

const fetchCountryDetails = async (name: string) => {
  const data = await (await fetch(`life-expecatancy/${name}`)).json();
  if (data) {
    return data.data as CountryDetails;
  } else {
    return null;
  }
};

export default function Home() {
  const [country, setCountry] = useState<Country | null>(null);
  const [dob, setDob] = useState<Date>(new Date("2001-07-26T00:00:00.000Z"));
  const [gender, setGender] = useState<string>("male");
  const [timeFrame, setTimeFrame] = useState<string>("weeks");

  const [years, setYears] = useState<number>(0);

  const age = useMemo(() => calculateAge(dob), [dob]);

  useEffect(() => {
    if (country) {
      fetchCountryDetails(country?.name).then((data) => {
        const CountryDetails = data as CountryDetails;
        setYears(
          CountryDetails.lifeExpectancy?.[gender as keyof LifeExpectancy]
        );
      });
    }
  }, [country, gender]);

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col items-center">
      <section className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-10">
        <div className="relative">
          <Image
            width={800}
            height={400}
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Life Journey"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white text-center">
              Life Visualizer
            </h1>
          </div>
        </div>

        <div className="p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              Welcome to the Life Visualizer
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Life is a precious journey, and each moment is a gift. The Life
              Visualizer is here to help you see how much time you still have,
              giving you a new perspective on your future and encouraging you to
              make the most of every day.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center pb-10">
          <Link
            className="border-2 px-10 font-bold text-[#7d452b] py-4 mx-auto w-fit border-[#7d452b] rounded-full hover:animate-pulse"
            href={"/calculator"}
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
