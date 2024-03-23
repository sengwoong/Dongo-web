import { axiosInstance, getJWTHeader } from "../../../../utils/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../utils/react_query/constants";
import { getStoredLoginData } from "../../auth/local-storage";
import { baseUrl } from "../../../../utils/axiosInstance/constants";



async function getProducts({ pageParam }: { pageParam: number }) {
    const userToken = getStoredLoginData();  
    const  response:Response  = await fetch(`${baseUrl}/product/select_my_all?size=5&page=${pageParam}`, {
        headers: getJWTHeader(userToken!.userToken),
    });
    return response.json();
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
    queryKey: ['projects'],
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




// getNextPageParam 함수 내에서 반환된 값을 로그로 출력


    // console.log("마지막데이터");
    // console.log(data);
    
    return { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status };
}
