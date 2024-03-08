
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./hooks/auth/AuthContext";
import { queryClient } from "./queryClient";
import Home from "./pages/components/Home";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import CreateVoca from "./pages/CreateVoca";
import Vocabulary from "./pages/Vocabulary";


export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <BrowserRouter>
            {/* 네비게이션 */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Post" element={<Post />} />
              <Route path="/CreatePost" element={<CreatePost />} />
              <Route path="/CreateVoca" element={<CreateVoca />} />
              <Route path="/Vocabulary" element={<Vocabulary />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>

  );
}
