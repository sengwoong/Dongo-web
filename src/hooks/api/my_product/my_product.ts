import { axiosInstance, getJWTHeader } from "../../../../utils/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../utils/react_query/constants";
import { getStoredLoginData } from "../../auth/local-storage";
import { baseUrl } from "../../../../utils/axiosInstance/constants";
import { Product } from "../../../../utils/types";
import { useQueryClient ,useMutation} from "@tanstack/react-query";

async function getProducts({ pageParam }: { pageParam: number }) {
    const userToken = getStoredLoginData();  
    const { data } = await axiosInstance(`/product/select_my_all?size=5&page=${pageParam}`, {
        headers: getJWTHeader(userToken!.userToken),
    });

    console.log(data)
    return data;
}


export function useProducts() {

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
} = useInfiniteQuery({
    queryKey: [queryKeys.products],
    queryFn: ({ pageParam }) => getProducts({ pageParam }), // 수정된 부분
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
        if (lastPage.pageable.pageNumber > lastPage.totalPages) {
            return null; // 다음 페이지가 없을 경우 null 반환
        } else {
            return lastPage.pageable.pageNumber + 1; // 다음 페이지 번호 반환
        }
    },
});
    
    return { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status };
}


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
  
  
  type DelectProductsParams = {
    productId: number;
  };


  export function useDelectProducts() {
    const queryClient = useQueryClient();
  
    const { mutate } = useMutation<void, unknown, DelectProductsParams>({
      mutationFn: ({ productId }) => delectProducts({productId,queryClient}),
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.products] });
      }
    });
  
    return mutate;
  }


  async function delectProducts({ productId,queryClient }: { productId: number ,queryClient:any}) {
    const userToken = getStoredLoginData();  
    console.log("userToken!.userToken")
    console.log(userToken!.userToken)
    const  response:Response  = await axiosInstance.delete(`/product/delete/${productId}`, {
        headers: getJWTHeader(userToken!.userToken),
    });
    queryClient.invalidateQueries({ queryKey: [queryKeys.products] });
    return response.json();
}
