"use client";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const SubmitPage = () => {
  const { score } = useParams();

  return (
    <div className="card min-h-screen flex flex-col items-center justify-center max-md:mx-4">
      <div className="bg-teal-400 rounded-lg shadow-lg p-6 w-1/2 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 max-md:w-full ">
        <div className="bg-white p-4 rounded-md flex justify-center items-center flex-wrap">
          <Image
            src="/trophy.png"
            alt="trophy"
            width={100}
            height={100}
            className=""
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold">🎉 Quiz Completed! 🎉</h1>
          <p className="text-xl mt-4">Your final score is:</p>
          <p className="text-4xl font-bold text-green-600">{score} / 40</p>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
