import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { useQuery, useQueryClient ,useMutation,useMutationState} from "@tanstack/react-query";
import { queryKeys } from "../../../../utils/react_query/constants";

async function getWords(productId:number) {
    const { data } = await axiosInstance.get(`word/select_all/${productId}`);
    return data;
  }
  async function exchangeWords(productId: number, before: string, cardId: string) {
    try {
        const { data } = await axiosInstance.post(`word/update/exchange/${productId}`, { "prevId":before, "currentId":cardId });
        console.log(data)
        return data;
    } catch (error) {
        console.error("Failed to exchange words:", error);
        throw error;
    }
}


  export function useWords(productId:number) {

    const queryClient = useQueryClient();
    useEffect(() => {
      // assume increment of one month
      queryClient.prefetchQuery({
        queryKey: [
          queryKeys.myWord,
          productId
        ],
        queryFn: () => getWords(productId)
      });
    }, [productId]);


 

    
    const { data: word , isLoading, isError } = useQuery({
      queryKey: [queryKeys.myWord, productId],
      queryFn: () => getWords(productId),
      refetchOnWindowFocus: true,
      refetchInterval: 60000, // every minute
    });

    return { word, isLoading, isError };
  }
  


  
  type UpdateWordDataParams = {
    productId: number;
    before: string;
    cardId: string;
  };

  








export function useUpdateWordData() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, unknown, UpdateWordDataParams>({
    mutationFn: ({ productId, before, cardId }) => exchangeWords(productId, before, cardId),
    onSuccess: (_, variables) => {
      const { productId } = variables;
      queryClient.invalidateQueries({ queryKey: [queryKeys.myWord, productId] });
    }
  });

  return mutate;
}



//   // // 단어 업데이트 함수
//   // const updateWordData = async (productId:string,before: string, cardId: string) => {
//   //   // 백엔드로 데이터 업데이트 요청
//   //   const success = await updateWords(productId, before, cardId);
//   //   if (success) {
//   //       // 업데이트 성공시 쿼리 다시 불러오기
//   //       refetch();
//   //   } else {
//   //       // 업데이트 실패 시 롤백 또는 에러 처리
//   //       console.error("Word update failed.");
//   //       // 롤백 또는 에러 처리 로직을 추가하세요.
//   //   }
// };