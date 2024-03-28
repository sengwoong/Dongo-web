import { FaFire } from "react-icons/fa";
import useDragProduct from "../../../utils/zustant/useDragProduct";
import { DropZone } from "./DropZone/DropZone";
import { FiTrash } from "react-icons/fi";
import { useState } from "react";
import { useDeleteWord } from "../../hooks/api/my_word/my_word";
import { useDelectProducts } from "../../hooks/api/my_product/my_product";

export function ColumnDrop({ columnId }: { columnId: number }) {
    const { updateProductNum ,stopDragging} = useDragProduct();
  
    const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      el.style.border = "none";
  
      const product = e.dataTransfer.getData("productId");
      const productParse = JSON.parse(product);
      const productId = productParse.id;
  
      updateProductNum(columnId, Number(productId))
      stopDragging();
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // Get the element being dragged over
      const el = e.currentTarget;
      // Add a CSS class to highlight the element
      el.style.border = "2px solid yellow"
    };
  
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      el.style.border = "none";
    };
  
    return (
      <DropZone
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragLeave={handleDragLeave} 
      />
    );
  }
  


  export function BurnBarrelDrop() {

    const [active, setActive] = useState(false);
    const [productId, setProductId] = useState(null); // 초기값은 null 또는 적절한 초기값으로 설정
    const delectProducts = useDelectProducts();
  

    const handleDragOver = (e:any) => {
      e.preventDefault();
      setActive(true);
    };
  

    const handleDragLeave = () => {
      // setActive(false);
    };


    const handleDragEnd = (e:any) => {
      console.log("쓰레기 통으로");
      const product = e.dataTransfer.getData("productId");
      const productParse = JSON.parse(product);
      const productId = productParse.id;
      setProductId(productId); // productId 업데이트
      console.log( "productId" );
      console.log( productId);
      delectProducts({ productId });
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
  }
  

  export function DropMenu({ children }: { children: React.ReactNode }) {
    const { isDragging } = useDragProduct();
    console.log("isDragging")
  console.log(isDragging)
    return (
      <div className={`w-screen justify-around absolute flex ${isDragging ? '' : 'hidden'}`}>
        {children}
      </div>
    );
  }
  
  
  