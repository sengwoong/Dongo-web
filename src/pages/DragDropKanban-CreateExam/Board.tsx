import { useEffect, useState } from "react";
import useDragProduct from "../../../utils/zustant/useDragProduct";
import { CardExamType, User } from "../../../utils/types";
import { BurnBarrelDrop, ColumnDrop, DropMenu } from "./ColumnDrop";
import { Column } from "./Column";
import { BurnBarrel } from "./BurnBarrel";
import { useProductFetching } from "../../hooks/api/product/product";
import { useExams } from "../../hooks/api/exam/exam";
import ProductList from "../components/ProductList";



interface ProductType {
  id: number | null;
  title: string;
  content: string;
  visible: boolean | null;
  type: string;
  downloadCount: number;
  price: number;
  createdAt: string;
  user: User;
}


export const Board: React.FC = () => {
  const { productsNum } = useDragProduct();
  const [card1, setCard1] = useState<CardExamType[]>([]);
  const [card2, setCard2] = useState<CardExamType[]>([]);

  const [title1, setTitle1] = useState<ProductType[]>([]);
  const [title2, setTitle2] = useState<ProductType[]>([]);

  const { exam: exams1, isLoading: isLoading1, isError: isError1 } = useExams(productsNum[1] || 0);
  const { exam: exams2, isLoading: isLoading2, isError: isError2 } = useExams(productsNum[2] || 0);
  const { allProducts } =useProductFetching()

  
useEffect(() => {
  if (allProducts !== null) {
    const newTitle1 = allProducts.filter((x) => x.id === productsNum[1]);
    const newTitle2 = allProducts.filter((x) => x.id === productsNum[2]);
    setTitle1(newTitle1);
    setTitle2(newTitle2);
  }
}, [allProducts.length,productsNum[1],productsNum[2]]);


  useEffect(() => {
    if (!isLoading1 && !isError1) {
      setCard1(exams1 || []);
    }
  }, [exams1, isLoading1, isError1]);


  useEffect(() => {
    if (!isLoading2 && !isError2) {
      setCard2(exams2 || []);
    }
  }, [exams2, isLoading2, isError2]);

  console.log("useProductFetching")
  console.log(useProductFetching())
  console.log(useProductFetching())
console.log(useProductFetching())

  return (
    <div className="flex flex-col h-full select-none gap-3 p-12 max-w-screen justify-center items-center">
      <div className="flex h-32 justify-center items-center max-w-prose">
      <ProductList
        useProductFetching = {useProductFetching}
        />
      </div>
      <div className="flex w-screen justify-around">
        <DropMenu>
          <ColumnDrop columnId={1} />
          <ColumnDrop columnId={2} />
          <BurnBarrelDrop />
        </DropMenu>
        <Column
          title={title1.length > 0 ? title1[0].content : null}
          productId={productsNum[1]!}
          headingColor="text-yellow-200"
          cards={card1}
          setCards={setCard1}
        />
        <Column
          title={title2.length > 0 ? title2[0].content :null}
          productId={productsNum[2]!}
          headingColor="text-blue-200"
          cards={card2}
          setCards={setCard2}
        />
        <BurnBarrel/>
      </div>
    </div>
  );
};
