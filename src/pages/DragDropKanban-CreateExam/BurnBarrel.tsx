import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import {  useDeleteExam } from "../../hooks/api/exam/exam";

export const BurnBarrel = () => {
  const [active, setActive] = useState(false);
  const delectexam = useDeleteExam();


  const handleDragOver = (e:any) => {
    e.preventDefault();
    setActive(true);
  };


  const handleDragLeave = () => {
    setActive(false);
  };


  const handleDragEnd = (e:any) => {
    console.log("쓰레기 통으로");
    const examId = e.dataTransfer.getData("examId");
    const productId = e.dataTransfer.getData("productId");
    delectexam({ productId, examId });
    setActive(false);
  };

  
  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};