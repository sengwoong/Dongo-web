import { CardExamType } from "../../../utils/types";
import { motion } from "framer-motion";


type CardProps = CardExamType & {
    handleDragStart: Function;
    productId:number;
  };
  

  export const Card = ({ content,title, examLocal,exam_id, product_id, handleDragStart }: CardProps) => {

    return (
      <>
        <DropIndicator beforeId={examLocal.toString()} productId={product_id} />
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { content,title,exam_id, examLocal, product_id })}
          className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
        >
          <p className="text-sm text-neutral-100">{title}</p>
          <p className="text-sm text-neutral-100">{content}</p>
        </div>
      </>
    );
  };
  

  type DropIndicatorProps = {
    beforeId: string | null;
    productId: number;
  };
  
  
 export const DropIndicator = ({ beforeId, productId }: DropIndicatorProps) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={productId}
        className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
      />
    );
  };
