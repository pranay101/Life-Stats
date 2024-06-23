import { TimeFrame } from "@/config/typeings";
import React from "react";

interface LifeYearsProps {
  years: number;
  age: number;
  type: TimeFrame;
}

const LifeYears: React.FC<LifeYearsProps> = ({
  years = 0,
  age = 0,
  type = "years",
}) => {
  const multiplingFactor = type === "years" ? 1 : type === "months" ? 12 : 52;

  const validCircles = Math.max(0, years * multiplingFactor);
  const validAge = Math.max(0, age) * multiplingFactor;

  const fullCirclesCount = Math.floor(validCircles);
  const halfCircleCount = validCircles % 1 >= 0.5 ? 1 : 0;

  const totalCirclesCount = Math.max(fullCirclesCount + halfCircleCount, 1);

  const circles = Array(totalCirclesCount).fill(0);

  return (
    <>
      {circles.length > 1 && (
        <ul className="list-disc list-inside my-10">
          <h1 className="text-3xl mb-4">Life Stats</h1>
          <li className="flex items-center text-sm gap-2 mb-2">
            Average Life Span in your country:{" "}
            <strong className="font-bold">
              {totalCirclesCount} {type}
            </strong>
          </li>

          <li className="flex items-center text-sm gap-2 mb-2">
            Life Spent:{" "}
            <strong className="font-bold">
              {age * multiplingFactor} {type}
            </strong>
          </li>

          <li className="flex items-center text-sm gap-2 mb-2">
            Life Remaining:{" "}
            <strong className="font-bold">
              {totalCirclesCount - age * multiplingFactor} {type}
            </strong>
          </li>
        </ul>
      )}
      <div className="flex flex-wrap gap-2 items-center">
        {circles.length > 1 &&
          circles.map((_, index) => {
            const circleAgeThreshold = index + 0.5;
            const isGray = validAge >= circleAgeThreshold;

            return (
              <div
                key={index}
                className={`w-5 h-5 rounded-full ${
                  isGray ? "bg-gray-300" : "bg-pink-500"
                }`}
                style={{ width: "10px", height: "10px" }}
              ></div>
            );
          })}
      </div>
    </>
  );
};

export default LifeYears;
