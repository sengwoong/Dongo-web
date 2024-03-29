import { useEffect } from "react";
import { axiosInstance, getJWTHeader } from "../../../../utils/axiosInstance";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { queryKeys } from "../../../../utils/react_query/constants";
import { getStoredLoginData } from "../../auth/local-storage";

export function useExams(productId:number) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Assume increment of one month
    queryClient.prefetchQuery({
      queryKey: [queryKeys.myExam, productId],
      queryFn: () => getExams(productId)
    });
  }, [productId]);

  const { data: exam , isLoading, isError } = useQuery({
    queryKey: [queryKeys.myExam, productId],
    queryFn: () => getExams(productId),
    refetchOnWindowFocus: true,
    refetchInterval: 60000, // Every minute
  });

  return { exam, isLoading, isError };
}

async function getExams(productId:number) {
  const { data } = await axiosInstance.get(`exam/select_all/${productId}`);
  return data;
}

type UpdateexamDataParams = {
  productId: number;
  before: string;
  cardLocal: string;
};

export function useUpdateexamData() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, unknown, UpdateexamDataParams>({
    mutationFn: ({ productId, before, cardLocal }) => exchangeExams(productId, before, cardLocal),
    onSuccess: (_, variables) => {
      const { productId } = variables;
      queryClient.invalidateQueries({ queryKey: [queryKeys.myExam, productId] });
    }
  });

  return mutate;
}

async function exchangeExams(productId: number, before: string, cardLocal: string) {
  try {
    const userToken = getStoredLoginData(); 
    const { data } = await axiosInstance.post(`exam/update/exchange/${productId}`, { "prevId":before, "currentId":cardLocal }
    , {
      headers: getJWTHeader(userToken!.userToken),
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to exchange exams:", error);
    throw error;
  }
}

type CreateexamDataParams = {
  productId: number;
  title: string;
  content: string;
};

export function useCreateExamData() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, unknown, CreateexamDataParams>({
    mutationFn: ({  productId, title, content}) =>   creatEexam(productId, title, content),
    onSuccess: (_, variables) => {
      const { productId } = variables;
      queryClient.invalidateQueries({ queryKey: [queryKeys.myExam, productId] });
    }
  });

  return mutate;
}

async function creatEexam(productId: number, title: string, content: string) {
  try {
    const response = await axiosInstance.post(`/exam/create/${productId}`, {
        title: title.trim(),
        content: content.trim(),
    });

    console.log(response);
  } catch (error) {
    console.error("Error adding card:", error);
  }
}

type DeleteexamDataParams = {
  productId: number;
  examId: number;
};

export function useDeleteExam() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, unknown, DeleteexamDataParams>({
    mutationFn: ({ productId, examId }) => deleteExam(productId, examId),
    onSuccess: (_, variables) => {
      const { productId } = variables;
      // 강제로 단어를 다시 가져오기
      queryClient.invalidateQueries({ queryKey: [queryKeys.myExam, Number(productId)] });
    },
  });

  return mutate;
}

const deleteExam = async (productId: number, examId: number) => {
  try {
    // Send deletion request
    const userToken = getStoredLoginData();  
    const response = await axiosInstance.delete(`/exam/delect/product/${productId}/exam/${examId}`, {
      headers: getJWTHeader(userToken!.userToken),
    });
    console.log('단어가 성공적으로 삭제되었습니다.');
    return response.data;
  } catch (error) {
    console.error('단어 삭제 중 오류가 발생했습니다:', error);
    throw error;
  }
};
