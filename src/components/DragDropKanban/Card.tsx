import { CardType } from "../../../utils/types";
import { motion } from "framer-motion";
type CardProps = CardType & {
    handleDragStart: Function;
    productId:number;
  };
  
  export const Card = ({ word,definition, wordLocal, productId, handleDragStart }: CardProps) => {

    return (
      <>
        <DropIndicator beforeId={wordLocal.toString()} productId={productId} />
        <motion.div
          layout
          layoutId={wordLocal.toString()}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { word,definition, wordLocal, productId })}
          className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
        >
          <p className="text-sm text-neutral-100">{word}</p>
          <p className="text-sm text-neutral-100">{definition}</p>
        </motion.div>
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
