import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-model";
import {
  CheckCheckIcon,
  Clock,
  ListCheck,
  PlayCircleIcon,
  TagIcon,
  TimerReset,
  TrophyIcon,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";

export async function AnimatedModalDemo() {

  const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
  const data = response.data;

  return (
    <div className="py-40  flex items-center justify-center ">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Start Quiz
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <PlayCircleIcon className="text-teal-400" />
          </div>
        </ModalTrigger>
        <ModalBody className=" max-md:mx-4 rounded-md">
          <ModalContent className="bg-white text-black p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2 mb-4">
              <TrophyIcon className="text-yellow-400" /> {data.title}
            </h2>

            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="flex items-center gap-2">
                <TagIcon className="text-yellow-300" />
                <span>Topic:</span>
              </div>
              <span className="font-semibold">{data.topic}</span>

              <div className="flex items-center gap-2">
                <ListCheck className="text-green-300" />
                <span>Questions:</span>
              </div>
              <span className="font-semibold">{data.questions_count}</span>

              <div className="flex items-center gap-2">
                <Clock className="text-red-300" />
                <span>Duration:</span>
              </div>
              <span className="font-semibold">{data.duration} min</span>

              <div className="flex items-center gap-2">
                <TimerReset className="text-red-500" />
                <span>Incorrect Marks:</span>
              </div>
              <span className="font-semibold">-{data.negative_marks}</span>

              <div className="flex items-center gap-2">
                <CheckCheckIcon className="text-green-500" />
                <span>Correct Marks:</span>
              </div>
              <span className="font-semibold">
                +{data.correct_answer_marks}
              </span>
            </div>
          </ModalContent>

          <ModalFooter className="gap-4 bg-white">
            <Link href={"/quiz"} className="bg-black text-center text-white text-sm px-2 py-1 rounded-md border border-black w-28">
              Start Now
            </Link>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
