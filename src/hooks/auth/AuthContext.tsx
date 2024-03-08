import { createContext, useContext, useState } from "react";

import {
  clearStoredLoginData,
  getStoredLoginData,
  setStoredLoginData,
} from "./local-storage";
import { LoginData } from "./types";

type AuthContextValue = {
  userId: number | null;
  userToken: string | null;
  setLoginData: (loginData: LoginData) => void;
  clearLoginData: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginData = () => {
  const authValue = useContext(AuthContext);
  console.log("authValue")
  console.log("authValue")
  console.log("useContext 에서 설정하는놈AuthContext userId, userToken, clearLoginData, setLoginData 로 예상됨")
  console.log(authValue)
  if (!authValue) {
    throw new Error(
      "Error! AuthContext called from outside the AuthContextProvider"
    );
  }

  return authValue;
};

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  const [loginData, setLoginDataRaw] = useState<LoginData | null>(() =>
    getStoredLoginData()
  );

  // null 체크 후 초기화
  const userId = loginData?.userId ?? null;
  const userToken = loginData?.userToken ?? null;

  const setLoginData = ({ userId, userToken }: LoginData) => {
    setLoginDataRaw({ userId, userToken });
    setStoredLoginData({ userId, userToken });
  };

  const clearLoginData = () => {
    setLoginDataRaw(null);
    clearStoredLoginData();
  };

  return (
    <AuthContext.Provider
      value={{ userId, userToken, clearLoginData, setLoginData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
