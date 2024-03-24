import { useEffect, useState } from "react";
import useDragProduct from "../../../utils/zustant/useDragProduct";
import { useWords } from "../../hooks/api/my_word/my_word";
import { CardType, WordData } from "../../../utils/types";
import ProductList from "./ProductList";
import { BurnBarrelDrop, ColumnDrop, DropMenu } from "./ColumnDrop";
import { Column } from "./Column";
import { BurnBarrel } from "./BurnBarrel";

export const Board: React.FC = () => {
  const { productsNum } = useDragProduct();
  const [card1, setCard1] = useState<CardType[]>([]);
  const [card2, setCard2] = useState<CardType[]>([]);

  const { word: words1, isLoading: isLoading1, isError: isError1 } = useWords(productsNum[1] || 0);
  const { word: words2, isLoading: isLoading2, isError: isError2 } = useWords(productsNum[2] || 0);


  useEffect(() => {
    if (!isLoading1 && !isError1) {
      setCard1(words1 || []);
    }
  }, [words1, isLoading1, isError1]);

  useEffect(() => {
    if (!isLoading2 && !isError2) {
      setCard2(words2 || []);
    }
  }, [words2, isLoading2, isError2]);

  return (
    <div className="flex flex-col h-full select-none gap-3 p-12 max-w-screen justify-center items-center">
      <div className="flex h-32 justify-center items-center max-w-prose">
        <ProductList />
      </div>
      <div className="flex w-screen justify-around">
        <DropMenu>
          <ColumnDrop columnId={1} />
          <ColumnDrop columnId={2} />
          <BurnBarrelDrop />
        </DropMenu>
        <Column
          title="TODO"
          column={productsNum[1]!}
          headingColor="text-yellow-200"
          cards={card1}
          setCards={setCard1}
        />
        <Column
          title="In progress"
          column={productsNum[2]!}
          headingColor="text-blue-200"
          cards={card2}
          setCards={setCard2}
        />
        <BurnBarrel/>
      </div>
    </div>
  );
};
