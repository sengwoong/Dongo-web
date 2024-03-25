import { Product } from "../../../../utils/types";

import { useProducts } from "../../../hooks/api/my_product/my_product";

export const useProductFetching = () => {
    const { data: products, fetchNextPage, hasNextPage, isFetching: isLoading } = useProducts();

  
    
    const getProductTitles = (products: any): Product[] => {
      if (!products) return []; // 제품 정보가 없는 경우 빈 배열 반환
      // 모든 페이지의 제품 정보를 하나의 배열로 평탄화(flatten)
      const allProducts: Product[] = getAllProductsFromPages(products.pages);
      // 타이틀만 추출하여 배열로 반환
      return allProducts;
    };
    // 타이틀만 추출하여 설정하는 함수
    const allProducts = getProductTitles(products);
  
  
  
  
    // setProduct를 반환하여 외부에서 사용할 수 있도록 함
    return { allProducts,products, fetchNextPage, hasNextPage, isLoading };
  };
  
  

interface Page {
    content: any[]; // 제품들의 배열
    // 다른 페이지 속성들도 필요하다면 여기에 추가할 수 있습니다.
  }
  
  const getAllProductsFromPages = (pages: Page[]): any[] => {
    if (!pages) return []; // 페이지 정보가 없는 경우 빈 배열 반환
    
    // 각 페이지의 제품들을 모두 합치는 배열
    let allProducts: any[] = [];
  
    // 각 페이지의 제품들을 allProducts 배열에 추가
    pages.forEach(page => {
      allProducts = allProducts.concat(page.content);
    });
  
    return allProducts;
  };
  
  