import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

  
 export const BurnBarrel = () => {
    const [active, setActive] = useState(false);
  
    const handleDragOver = (e:any) => {
      e.preventDefault();
      setActive(true);
    };
  
    const handleDragLeave = () => {
      setActive(false);
    };
  
    const handleDragEnd = (e:any) => {
  // todo 단어 지우기
        console.log("쓰레기 통으로")
      const cardId = e.dataTransfer.getData("cardId");
      console.log(cardId)
      // setCards((pv) => pv.filter((c) => c.product_id.toString() !== cardId));
  
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
  