import axios from "axios";
import React from "react";
import QuizComponents from "./_components/QuizComponents";

const QuizPage = async () => {
  const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
  const quizData = response.data;

  return (
    <div className="card bg-teal-400 min-h-screen p-6 flex flex-col items-center justify-center max-md:p-4">
      <QuizComponents quizData={quizData} />
    </div>
  );
};

export default QuizPage;
