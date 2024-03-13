

import axios,{ AxiosResponse } from "axios";


import { useLoginData } from "./AuthContext";
import { User } from "../../../utils/types";
import { axiosInstance } from "../../../utils/axiosInstance";
import { useUser } from "./hooks/useUser";


interface UseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

type UserResponse = { 
  userId: number,
  token:string
};
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

export function useAuthActions(): UseAuth {
  const { updateUser, clearUser } = useUser();// 쿼리메소드 
  const { setLoginData, clearLoginData } = useLoginData();// 로컬스토리지

  const SERVER_ERROR = "There was an error contacting the server.";

  async function authServerCall(
    urlEndpoint: string,
    email: string,
    pwd: string,
  ): Promise<void> {
    try {

      const { data, status }: AxiosResponse<AuthResponseType> = await axiosInstance.post(urlEndpoint, { email, pwd }, {
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (status === 400) {
        const title = "message" in data ? data.message : "Unauthorized";
  
        return;
      }  
      if ( data ) {
        const { userId, token } = data as UserResponse;
        updateUser(data as UserResponse); // 리엑트쿼리에 토큰을 들고가기 
        setLoginData({ userId: userId , userToken: token ??'' }); // 로컬스토리지 토큰산입
      }
    } catch (errorResponse) {
      const title =
        axios.isAxiosError(errorResponse) &&
        errorResponse?.response?.data?.message
          ? errorResponse?.response?.data?.message
          : SERVER_ERROR;
    }
  }


  async function signin(email: string, password: string): Promise<void> {
    console.log("로그인")
    authServerCall("/user/login", email, password);
  }
  async function signup(email: string, password: string): Promise<void> {
    authServerCall("/register", email, password);
  }

  function signout(): void {
    console.log("signout")
    clearUser();
    console.log("signout")
    clearLoginData();
  }

  return {
    signin,
    signup,
    signout,
  };
}
