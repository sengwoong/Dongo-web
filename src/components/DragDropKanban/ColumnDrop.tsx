import useDragProduct from "../../../utils/zustant/useDragProduct";
import { DropZone } from "./DropZone/DropZone";

export function ColumnDrop({ columnId }: { columnId: number }) {
    const { updateProductNum } = useDragProduct();
  
    const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      el.style.border = "none";
  
      const product = e.dataTransfer.getData("productId");
      const productParse = JSON.parse(product);
      const productId = productParse.id;
  
      updateProductNum(columnId, Number(productId))
  
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
    return (
      <div className={` mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl`}></div>
    );
  }
  
  export function DropMenu({ children }: { children: React.ReactNode }) {
    return <div className="w-screen  justify-around absolute flex ">{children}</div>;
  }
  
  
  