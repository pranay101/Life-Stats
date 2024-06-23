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

export default function Calculator() {
  const [instructions, setInstuctions] = useState<boolean>(true);

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-10">
      <section className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-10 h-full">
        {!instructions && (
          <div className="flex items-center justify-evenly  mb-10 flex-wrap">
            <CountryPicker
              selectedCountry={country}
              setSelectedCountry={setCountry}
            />
            <DatePicker onChange={setDob} value={dob} />
            <GenderPicker value={gender} onChange={setGender} />
            <TimeFramePicker onChange={setTimeFrame} value={timeFrame} />
            <button
              onClick={setInstuctions.bind(null, true)}
              className="bg-gray-800  text-white text-xs rounded-full px-4 py-2 "
            >
              Insructions
            </button>
          </div>
        )}
        {instructions && (
          <div className="text-left my-10">
            <h3 className="font-bold text-gray-700 mb-4">
              How to Use the Life Visualizer
            </h3>
            <div className="mx-auto text-sm text-gray-600 leading-relaxed">
              <p>
                1. Enter your current age to see how much time has already
                passed.
              </p>
              <p>
                2. Provide an estimate of your expected lifespan to see the
                years you have left.
              </p>
              <p>
                3. Select whether you want to view your remaining time in weeks,
                months, or years.
              </p>
              <p>
                4. The Life Visualizer will generate a visual representation of
                your remaining time, helping you prioritize whats truly
                important.
              </p>
            </div>

            <button
              onClick={setInstuctions.bind(null, false)}
              className="bg-gray-800  text-white text-xs rounded-full px-4 py-2 mt-5"
            >
              Okay, Got it
            </button>
          </div>
        )}

        <LifeYears age={age + 20} years={years} type={timeFrame as TimeFrame} />

        {!instructions && (
          <div className="text-sm mt-10">
            <span className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full bg-pink-500`} />
              Life Left
            </span>
            <span className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full bg-gray-300`} />
              Life Spent
            </span>
            <span className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full bg-gray-300`} />
              Life Spent
            </span>
          </div>
        )}

        <footer>
          <a
            className="flex items-center text-gray-700 hover:text-pink-900 text-sm"
            href="https://github.com/pranay101/Life-Stats"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </footer>
      </section>
    </main>
  );
}
