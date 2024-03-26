import { useEffect, useState } from "react";
import { axiosInstance, getJWTHeader } from "../../../../utils/axiosInstance";
import { useQuery, useQueryClient ,useMutation,useMutationState} from "@tanstack/react-query";
import { queryKeys } from "../../../../utils/react_query/constants";
import { getStoredLoginData } from "../../auth/local-storage";


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


  async function getWords(productId:number) {
    const { data } = await axiosInstance.get(`word/select_all/${productId}`);
    return data;
  }


  type UpdateWordDataParams = {
    productId: number;
    before: string;
    cardLocal: string;
  };


export function useUpdateWordData() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, unknown, UpdateWordDataParams>({
    mutationFn: ({ productId, before, cardLocal }) => exchangeWords(productId, before, cardLocal),
    onSuccess: (_, variables) => {
      const { productId } = variables;
      queryClient.invalidateQueries({ queryKey: [queryKeys.myWord, productId] });
    }
  });

  return mutate;
}


async function exchangeWords(productId: number, before: string, cardLocal: string) {
  try {
      const { data } = await axiosInstance.post(`word/update/exchange/${productId}`, { "prevId":before, "currentId":cardLocal });
      console.log(data)
      return data;
  } catch (error) {
      console.error("Failed to exchange words:", error);
      throw error;
  }
}


type CreateWordDataParams = {
  productId: number;
  wordText: string;
  definition: string;
};


export  function useCreateWordData() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, unknown, CreateWordDataParams>({
    mutationFn: ({  productId, wordText, definition}) =>   createWord(productId, wordText, definition),
    onSuccess: (_, variables) => {
      const { productId } = variables;
      queryClient.invalidateQueries({ queryKey: [queryKeys.myWord, productId] });
    }
  });

  return mutate;
}


async function createWord(productId: number, wordText: string, definition: string) {
  try {
      const response = await axiosInstance.post(`/word/create/${productId}`, {
          word: wordText.trim(),
          definition: definition.trim(),
      });

      console.log(response);
  } catch (error) {
      console.error("Error adding card:", error);
  }
}


type DelectWordDataParams = {
  productId: number;
  wordId: number;
};



export function useDeleteWord() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, unknown, DelectWordDataParams>({

    mutationFn: ({ productId, wordId }) => deleteWord(productId, wordId,queryClient),
    onSuccess: (_, variables) => {
      const { productId } = variables;
      queryClient.invalidateQueries({ queryKey: [queryKeys.myWord, productId] });
    },
    onError: (error, variables) => {
      const { productId } = variables;
      queryClient.invalidateQueries({ queryKey: [queryKeys.myWord, productId] });
      console.error("Mutation failed:", error);
    }
  });
  queryClient.invalidateQueries({ queryKey: [queryKeys.myWord, 15] });
  return mutate;
}


const deleteWord = async (productId: number, wordId: number,queryClient:any) => {
  try {
    // 삭제 요청 보내기
    const userToken = getStoredLoginData();  
    const response = await axiosInstance.delete(`/word/delect/product/${productId}/word/${wordId}`, {
      headers: getJWTHeader(userToken!.userToken),
  });
    console.log('단어가 성공적으로 삭제되었습니다.');
    queryClient.invalidateQueries({ queryKey: [queryKeys.myWord, productId] });
    return response.data;
  } catch (error) {
    console.error('단어 삭제 중 오류가 발생했습니다:', error);
    throw error;
  }
};
