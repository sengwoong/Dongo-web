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