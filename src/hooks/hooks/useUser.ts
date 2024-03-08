import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { generateUserKey } from "@/../../utils/react_query/key-factories";
import { queryKeys } from "@/../../utils/react_query/constants";
import { User } from "../../../utils/types";
import { axiosInstance, getJWTHeader } from "../../../utils/axiosInstance";
import { useLoginData } from "../auth/AuthContext";

// query function
async function getUser(userId: number, userToken: string) {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${userId}`,
    {
      headers: getJWTHeader(userToken),
    }
  );

  return data.user;
}

export function useUser() {
  const queryClient = useQueryClient();

  // get details on the userId
  const { userId, userToken } = useLoginData();

  // call useQuery to update user data from server
  const { data: user } = useQuery({
    enabled: !!userId,
    queryKey: generateUserKey(userId!, userToken!),
    queryFn: () => getUser(userId!, userToken!),
    staleTime: Infinity,
  });
// console.log("user")
// console.log("user")
// console.log("user 페이지 에서 사용되는 유조종보라고 생각함")
// console.log(user)
  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    queryClient.setQueryData(
      generateUserKey(newUser.id, newUser.token??''),
      newUser
    );
  }

  // meant to be called from useAuth
  function clearUser() {
    // remove user profile data
    queryClient.removeQueries({ queryKey: [queryKeys.user] });

    // remove user appointments data
    queryClient.removeQueries({
      queryKey: [queryKeys.appointments, queryKeys.user],
    });
  }

  return { user, updateUser, clearUser };
}

