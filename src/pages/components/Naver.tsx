import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SelectableTitleList } from '../../components/CrateSelectableTitleList'
import { MiniMenuTitle } from '../../components/TitleContent'
import { useAuthActions } from '../../hooks/auth/useAuthActions';

// todo 파라미터로 강조표시 타이틀 버그있음
function Naver() {
    const titles: string[] = ['다운로드', '시험장', '단어장', '내노트'];

    const authActions = useAuthActions();
    const { signout } = authActions;
    

    const navigate = useNavigate();
  
  
    function logoutBtn(){
      console.log("로그아웃")
      signout()
    }
  
    function loginBtn(){
      console.log("로그인")
      navigate(`/login`); 
    }
  return (
    <div className="flex">
      <Link to=''>
        <h1 className="w-1/5 p-4">DonGo</h1>
      </Link>
      <SelectableTitleList titles={titles} plusTw="w-3/10" />
      <div className={`flex justify-around w-1/5 items-start mt-3`}>
      <MiniMenuTitle text={"로그인"} onClick={loginBtn}></MiniMenuTitle>
      <MiniMenuTitle text={"로그아웃"} onClick={logoutBtn}></MiniMenuTitle>
      </div>
    </div>
  )
}

export default Naver