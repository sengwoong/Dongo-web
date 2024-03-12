// SelectableTitleList.tsx
import React, { useState } from 'react';
import { MenuTitle, MiniMenuTitle } from './TitleContent';
import { useNavigate } from 'react-router-dom';
import { paramKeys, paramKrToEng } from './Params';



interface SelectableTitleListProps {
  titles: string[];
  plusTw: string;
}



export const SelectableTitleList: React.FC<SelectableTitleListProps> = ({ titles,plusTw }) => {


  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleTitleClick = (title: string) => {
  const englishTitle = paramKrToEng[title];

    setSelectedTitle(title);
    navigate(`/${englishTitle}`); // 영어 타이틀을 URL로 사용
  };
  
  return (
<div className={`w-full flex justify-around items-center ${plusTw}`}>
      {titles.map((title, index) => (
        <MenuTitle
          key={index}
          text={title}
          isSelected={selectedTitle === title}
          onClick={() => handleTitleClick(title)}
        />
      ))}
    </div>
  );
}



interface SelectableMiniTitleListProps {
    titles: string[];
    plusTw: string;
    onClick: () => void;
  }

  
  
export const SelectableMiniTitleList: React.FC<SelectableMiniTitleListProps> = ({ titles,plusTw ,onClick}) => {
  
    return (
  <div className={`w-full flex justify-around  ${plusTw}`}>
        {titles.map((title, index) => (
          <MiniMenuTitle
            key={index}
            text={title}
            onClick={() => onClick()}
          />
        ))}
      </div>
    );
  }

  