import { useRef } from "react";
import useDragProduct from "../../../utils/zustant/useDragProduct";
import { useProductFetching } from "../../hooks/api/my_product/my_product";
import CardComponent from "../../pages/components/Card";
import { CardBody, CardHeader, CardWrapper } from "../Card";
import { Product } from "../../../utils/types";
import React from 'react';


export default function ProductList() {
    const {  products, fetchNextPage, hasNextPage,  isLoading } = useProductFetching();

    const {  productsNum,startDragging, stopDragging } = useDragProduct();
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
            const cardLocal = e.dataTransfer.getData("productId");
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
      className="flex w-screen overflow-x-auto "
      ref={productListRef} 
      onWheel={handleWheel} 
      onDragEnd={handleDragEnd}
    >
      {products.pages.map((pageData, pageIndex) => (
          <div key={pageIndex} className="flex flex-no-wrap">
              {pageData.content.map((product: Product, productIndex: number) => {
                  if (product.id !== productsNum[1] && product.id !== productsNum[2]) {
                      return (
        <div key={productIndex} className="w-56 h-20 m-3" draggable onDragStart={(e) => handleDragStart(e, product)} >
        <CardWrapper>
        <div className='rounded-3xl' style={{ height: `40%` }}>
          <CardHeader backgroundColor='blue'>
            <div className="flex w-full justify-around">
              <div>{product.id}</div>
              <div>{product.title}</div>
            </div>
            </CardHeader>
        </div>
        <div className="flex flex-col justify-center items-cente text-center" style={{height: `60%` }}>
          <CardBody backgroundColor='red'>{product.content}</CardBody>
        </div>   
        </CardWrapper>
        </div>);}
                  return null;
              })}
          </div>
      ))}
      {hasNextPage && (
          <button onClick={loadMore} className="my-4 mx-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center">
              Load More
          </button>
      )}
  </div>

    );
  }



  