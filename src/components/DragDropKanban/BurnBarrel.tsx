import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import {  useDeleteWord } from "../../hooks/api/my_word/my_word";

export const BurnBarrel = () => {
  const [active, setActive] = useState(false);
  const [productId, setProductId] = useState(null); // 초기값은 null 또는 적절한 초기값으로 설정

  const delectWord = useDeleteWord();

  const handleDragOver = (e:any) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    // setActive(false);
  };

  const handleDragEnd = (e:any) => {
    console.log("쓰레기 통으로");
    const wordId = e.dataTransfer.getData("wordId");
    const productId = e.dataTransfer.getData("productId");
    setProductId(productId); // productId 업데이트
    // 삭제 로직 실행 예시
    delectWord({ productId, wordId });
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