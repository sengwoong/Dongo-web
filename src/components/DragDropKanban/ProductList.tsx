import { useRef, useState } from "react";
import { useProducts } from "../../hooks/api/my_product/my_product";
import useDragProduct from "../../../utils/zustant/useDragProduct";


export default function ProductList() {
    const { data: products, fetchNextPage, hasNextPage, isFetching: isLoading } = useProducts();
    const [isEndOfScroll, setIsEndOfScroll] = useState(true);

    const { isDragging, startDragging, stopDragging } = useDragProduct();

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
            {pageData.content.map((product: any, productIndex: number) => (
              <div
                key={productIndex}
                className="my-4 w-24 mx-4"
                draggable // 드래그 가능하도록 설정합니다.
                onDragStart={(e) => handleDragStart(e, product)}
              >
                <h3>{product.title}</h3>
                <p>{product.content}</p>
              </div>
            ))}
          </div>
        ))}
  
        {isEndOfScroll && hasNextPage && (
          <button onClick={loadMore} className="my-4 mx-4">
            Load More
          </button>
        )}
      </div>
    );
  }