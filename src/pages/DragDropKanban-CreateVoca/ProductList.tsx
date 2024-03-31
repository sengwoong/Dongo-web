import { useRef, useState } from "react";
import useDragProduct from "../../../utils/zustant/useDragProduct";
import {  InfiniteData, FetchNextPageOptions } from '@tanstack/react-query';

import { CardBody, CardHeader, CardWrapper } from "../../components/Card";
import { Product } from "../../../utils/types";
import React from 'react';


// (alias) const useProductFetching: () => {
//     allProducts: Product[];
//     products: InfiniteData<any, unknown> | undefined;
//     fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<...>;
//     hasNextPage: boolean;
//     isLoading: boolean;
// }

interface ProductFetchingResult {
    allProducts: Product[]; // 모든 상품 목록
    products: InfiniteData<any, unknown> | undefined; // 페이지네이션된 상품 목록
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<any>; // 다음 페이지의 상품을 가져오는 함수
    hasNextPage: boolean; // 다음 페이지 여부
    isLoading: boolean; // 로딩 상태
}


export default function ProductList({ useProductFetching }: { useProductFetching: () => ProductFetchingResult }) {
    const {  products, fetchNextPage, hasNextPage,  isLoading } = useProductFetching();
    const {  productsNum,startDragging, stopDragging } = useDragProduct();
    const productListRef = useRef<HTMLDivElement>(null);
    const [scrollBarWidth, setScrollBarWidth] = useState<string>('0%');

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

            setScrollBarWidth(getScrollBarWidth());
        }
    };

    const loadMore = () => {      
        if (hasNextPage && !isLoading) {
            fetchNextPage();
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: any) => {
        e.dataTransfer.setData('productId', JSON.stringify(product)); // 드래그하는 상품 데이터를 설정합니다.
        startDragging();
        setScrollBarWidth(getScrollBarWidth());
    };

    if (isLoading && !products) {
        return <div>Loading...</div>;
    }

    if (!products || products.pages.length === 0) {
        return <div>No products available</div>;
    }

    const getScrollBarWidth = () => {
        if (productListRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = productListRef.current;
            return `${(scrollLeft / (scrollWidth - clientWidth)) * 100 || 0}%`;
        }
        return '0%'; 
    };


    

    return (
        <div 
            className="flex w-screen overflow-x-auto scrollbar-hide"
            ref={productListRef} 
            onWheel={handleWheel} 
            onDragEnd={handleDragEnd}
        >
          <div className="relative flex"  >
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
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            ))}
        
            <div className="h-2  absolute bg-blue-500 bottom-0 left-0 z-50" style={{ width: scrollBarWidth }}></div>
            </div>
            {hasNextPage && (
                <button onClick={loadMore} className="my-4 mx-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center">
                    Load More
                </button>
            )}
        </div>
    );
}
