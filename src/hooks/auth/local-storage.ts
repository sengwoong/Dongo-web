const USER_LOCALSTORAGE_KEY = "user";
import { LoginData } from "./types";


export function getStoredLoginData(): LoginData | null {
  const storedLoginData = localStorage.getItem(USER_LOCALSTORAGE_KEY) ?? '';
  try {
    return JSON.parse(storedLoginData);
  } catch {
    return null;
  }
}

export function setStoredLoginData(loginData: LoginData): void {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(loginData));
}

export function clearStoredLoginData(): void {
  console.log("clearStoredLoginData 까지 실행 ")
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  console.log("clearStoredLoginData 에서 에러")
}
