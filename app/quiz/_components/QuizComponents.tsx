"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface QuizPageProps {
  quizData: any;
}

const QuizComponents = ({ quizData }: QuizPageProps) => {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState<number>(900);
  const [timeEnded, setTimeEnded] = useState<boolean>(false);
  const [quesNumber, setQuesNumber] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);


  const quiz = quizData.questions[quesNumber];

  const handleCorrectAnswer = (isCorrect: boolean, optionId: number) => {
    if (!answered) {
      setSelectedOption(optionId);
      if (isCorrect) {
        setScore(score + 4);
      } else {
        setScore(score - 1);
      }
      setAnswered(true);
    }
  };

  useEffect(() => {
    if (submitted) return

    const interval = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(interval);
          setTimeEnded(true);
          handleSubmit()
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted,score, router]);

  const progressPercentage = ((900 - timeLeft) / 900) * 100;

  const handleNext = () => {
    if (quesNumber < quizData.questions_count - 1) {
      setQuesNumber(quesNumber + 1);
      setAnswered(false);
    }
  };

  const handleSubmit = () => {
    if (!submitted) {
      setSubmitted(true); 
      localStorage.setItem("score", String(score));
      router.push(`/submit/${score}`)
    }
  };

  return (
    <div className="bg-teal-400 rounded-lg shadow-lg p-6 w-3/4 max-md:w-full hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 ">
      <div className="flex flex-col items-center">
        {/* ProgressBar  */}

        <div className="w-full bg-white rounded-full p-1 h-[20px]">
          <div
            className="bg-teal-100 rounded-full h-[10px]"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div className="text-right mt-2 text-lg">
            Time Remaining: {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>
          {timeEnded && (
            <div className="text-right mt-2 text-2xl font-bold">
             Time&apos;s up!
            </div>
          )}
        </div>

        <div className="w-full text-center my-6">
          <h2 className="text-3xl font-bold mb-2 max-md:mt-6 max-md:text-2xl" key={quiz.id}>
            Question {quesNumber + 1} of {quizData.questions_count}
          </h2>
          <div className="text-lg my-4 text-gray-700 max-md:text-[16px] max-md:my-1" >
            ( Topic: {quiz.topic})
          </div>
          <div className="text-xl mb-4 font-semibold max-md:text-lg max-md:mt-4">{quiz.description}</div>
          {/* <div className="text-xl font-semibold text-white">Score: {score}</div> */}
        </div>

        <div className="grid grid-cols-2 w-full gap-6">
          {quiz.options?.map((option: any) => (
            <div
              key={option.id}
              onClick={() => handleCorrectAnswer(option.is_correct, option.id)}
              className={cn(
                "bg-white text-black max-md:text-[16px] font-semibold p-4 rounded-xl shadow-lg transition-all duration-250 hover:scale-105 hover:shadow-2xl cursor-pointer",
                answered
                  ? option.is_correct
                    ? "bg-green-600 text-white"
                    : selectedOption === option.id
                    ? "bg-red-600 text-white"
                    : "bg-white"
                  : ""
              )}
            >
              {option.description}
            </div>
          ))}
        </div>
        <div>
          {answered && (
            <div className="text-white font-semibold mt-9 text-xl max-md:text-[16px]">
              <span className="text-black ">Solution: </span>

              <div
                dangerouslySetInnerHTML={{ __html: quiz.detailed_solution }}
              ></div>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end w-full">
          <button
            onClick={
              quesNumber === quizData.questions_count - 1
                ? handleSubmit
                : handleNext
            }
            disabled={!answered}
            className="bg-black text-white p-3 rounded-lg shadow-lg disabled:opacity-50 hover:shadow-2xl transition-all"
          >
            {quesNumber === quizData.questions_count - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizComponents;
