import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthContextProvider } from "./hooks/auth/AuthContext";
import { queryClient } from "./queryClient";
import Home from "./pages/Home";
import CreateVoca from "./pages/CreateVoca";
import Vocabulary from "./pages/Vocabulary";
import Login from "./pages/Login";
import Naver from "./pages/components/Naver";
import DownLoad from "./pages/DownLoad";
import CreateExam from "./pages/CreateExam";
import Post from "./pages/Post";

// NotFound 컴포넌트를 정의해야 합니다.
const NotFound = () => {
  return <div>Not Found</div>;
};

const TopNaver = () => {
  return (
    <div className="">
      <Naver />
      <Outlet />
    </div>
  );
};

const SiteLayout = () => {
  return (
    <div>
      <TopNaver />
    </div>
  );
};

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <SiteLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/DownLoad", element: <DownLoad /> },
        { path: "/CreateExam", element: <CreateExam /> },
        { path: "/CreateVoca", element: <CreateVoca /> },
        { path: "/Vocabulary", element: <Vocabulary /> },
        { path: "/Login", element: <Login /> },
        { path: "/Post", element: <Post /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={routes} />
      </AuthContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
