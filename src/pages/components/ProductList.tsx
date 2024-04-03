import { useRef, useState } from "react";
import useDragProduct from "../../../utils/zustant/useDragProduct";
import { InfiniteData, FetchNextPageOptions } from '@tanstack/react-query';

import { CardBody, CardHeader, CardWrapper } from "../../components/Card";
import { Product } from "../../../utils/types";
import React from 'react';
import { useHorizontalScroll } from "../../hooks/useSideScroll";
import { useSideScrollPercentage } from "../../hooks/useSideScrollPercentage";

interface ProductFetchingResult {
    allProducts: Product[]; // 모든 상품 목록
    products: InfiniteData<any, unknown> | undefined; // 페이지네이션된 상품 목록
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<any>; // 다음 페이지의 상품을 가져오는 함수
    hasNextPage: boolean; // 다음 페이지 여부
    isLoading: boolean; // 로딩 상태
}

export default function ProductList({ useProductFetching }: { useProductFetching: () => ProductFetchingResult }) {
    const { products, fetchNextPage, hasNextPage, isLoading } = useProductFetching();
    const { productsNum, startDragging, stopDragging } = useDragProduct();
    const productListRef = useHorizontalScroll();


    const handleDragEnd = () => {
        stopDragging();
    };

    const loadMore = () => {
        if (hasNextPage && !isLoading) {
            fetchNextPage();
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: any) => {
        e.dataTransfer.setData('productId', JSON.stringify(product)); // 드래그하는 상품 데이터를 설정합니다.
        startDragging();
    };

    if (isLoading && !products) {
        return <div>Loading...</div>;
    }

    if (!products || products.pages.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div className="flex w-screen scrollbar-hide overflow-x-scroll" ref={productListRef} onDragEnd={handleDragEnd}>
            <div className="relative flex">
                {products.pages.map((pageData, pageIndex) => (
                    <div key={pageIndex} className="flex flex-no-wrap">
                        {pageData.content.map((product: Product, productIndex: number) => {
                            if (product.id !== productsNum[1] && product.id !== productsNum[2]) {
                                return (
                                    <div key={productIndex} className="w-56 h-20 m-3" draggable onDragStart={(e) => handleDragStart(e, product)}>
                                        <CardWrapper>
                                            <div className='rounded-3xl' style={{ height: `40%` }}>
                                                <CardHeader backgroundColor='blue'>
                                                    <div className="flex w-full justify-around flex-wrap">
                                                        <div>{product.id}</div>
                                                        <div>{product.title}</div>
                                                    </div>
                                                </CardHeader>
                                            </div>
                                            <div className="flex flex-col justify-center items-center text-center" style={{ height: `60%` }}>
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
            </div>
         
            {hasNextPage && (
                <button onClick={loadMore} className="my-4 mx-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center">
                    Load More
                </button>
            )}
        </div>
    );
}
