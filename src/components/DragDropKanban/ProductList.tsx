import { useRef } from "react";
import useDragProduct from "../../../utils/zustant/useDragProduct";
import { useProductFetching } from "./ProductApi/prodcut_api";


export default function ProductList() {
    const {  products, fetchNextPage, hasNextPage,  isLoading } = useProductFetching();

    const { productsNum } = useDragProduct();
    const {  startDragging, stopDragging } = useDragProduct();
    useProductFetching();
    const productListRef = useRef<HTMLDivElement>(null);
  
    const handleDragEnd = () => {
      stopDragging();
  };

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
      const productListElement = productListRef.current;
      if (productListElement) {
        const { scrollLeft, scrollWidth, clientWidth } = productListElement;
        if (scrollLeft > scrollWidth - clientWidth - ((scrollWidth - clientWidth) / 10)) {
          loadMore();
        }
      }
    };
  
    const loadMore = () => {
      if (hasNextPage && !isLoading) {
        fetchNextPage();
      }
    };
  
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: any) => {

            e.dataTransfer.setData('productId', JSON.stringify(product)); // 드래그하는 상품 데이터를 설정합니다.
            const cardId = e.dataTransfer.getData("productId");
            startDragging()
    };
  


    
  
    if (isLoading && !products) {
      return <div>Loading...</div>;
    }
  
    if (!products || products.pages.length === 0) {
      return <div>No products available</div>;
    }
  



    return (
      <div
        className="z-50 flex max-w-prose overflow-scroll"
        ref={productListRef}
        onWheel={handleWheel}
        onDragEnd={handleDragEnd}
      >
      {products.pages.map((pageData, pageIndex) => (
  <div key={pageIndex} className="flex flex-no-wrap">
    {pageData.content.map((product: any, productIndex: number) => {
      // productsNum의 각 요소와 현재 제품의 ID가 다른 경우에만 제품을 표시
      if (product.id !== productsNum[1] && product.id !== productsNum[2]) {
        return (
          <div
            key={productIndex}
            className="my-4 w-24 mx-4"
            draggable // 드래그 가능하도록 설정합니다.
            onDragStart={(e) => handleDragStart(e, product)}
          >
            <h3>{product.title}</h3>
            <p>{product.content}</p>
          </div>
        );
      }
      return null; // productsNum 배열의 요소와 동일한 ID를 가진 제품은 표시하지 않음
    })}
  </div>
))}
        
  
        {  hasNextPage && (
          <button onClick={loadMore} className="my-4 mx-4">
            Load More
          </button>
        )}
      </div>
    );
  }