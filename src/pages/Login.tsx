import React, {  useState } from 'react';
import { useAuthActions } from '../hooks/auth/useAuthActions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authActions = useAuthActions();
  const { signin } = authActions;

  const handleLogin = async ()=> {
    await signin(email, password);
  };

 
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="useremail">
              사용자 이메일 
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="사용자 이름"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              비밀번호
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            {/* 버튼은 컴포는트로 만들기 */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={()=>{handleLogin()}}
              // 버튼 클릭 시에만 로그인 함수 실행
            >
              로그인
            </button>
    
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
