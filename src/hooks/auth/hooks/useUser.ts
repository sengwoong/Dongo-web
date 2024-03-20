import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { generateUserKey } from "../../../../utils/react_query/key-factories.ts";
import { User } from "../../../../utils/types.ts";
import { useLoginData } from "../AuthContext";
import { queryKeys } from "../../../../utils/react_query/constants.ts";
import { axiosInstance, getJWTHeader } from "../../../../utils/axiosInstance/index.ts";

type UserResponse = { 
  userId: number,
  token:string
};
// query function
// 토근으로 유저의 아디를 들고오기 (뱍엔드에서 요청보내는듯)
// 리플레쉬 토큰 을 던져줘서 새로로그인시킬수 있다.
async function getUser(userId: number, userToken: string) {
  console.log("애왜 실행됨? ")
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/token/${userId}`,
    {
      headers: getJWTHeader(userToken),
    }
  );

  return data.user;
}


export function useUser() {
  const queryClient = useQueryClient();

  console.log("useUser 가문제 ")
  // get details on the userId
  const { userId, userToken } = useLoginData();



  // 리렌더랑 돼면서 한번 user 가 로그인 돼든 안돼든 불러와지는게 문제임
  // 이거를 리엑트 쿼리에서 서치하는쿼리로 바꾸거나 그냥지워야함 그

  const { data: user } = useQuery({
    enabled: !!userId,
    queryKey: generateUserKey(),
    queryFn: () => getUser(userId!, userToken!),
    staleTime: Infinity,
  });

  console.log("user ")
  console.log(user)
  console.log(user)
  function updateUser(newUser: UserResponse): void {
    console.log("updateUser 가문제 ")

    queryClient.setQueryData(
      generateUserKey(),
      newUser
    );
  }

  function clearUser() {
    queryClient.removeQueries({ queryKey: [queryKeys.user] });
  }

  return { user, updateUser, clearUser };
}

