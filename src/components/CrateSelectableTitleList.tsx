// SelectableTitleList.tsx
import React, { useState } from 'react';
import MenuTitle from './TitleContent';


interface SelectableTitleListProps {
  titles: string[];
}

const SelectableTitleList: React.FC<SelectableTitleListProps> = ({ titles }) => {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const handleTitleClick = (title: string) => {
    setSelectedTitle(title);
  };

  return (
    <div className='w-full flex justify-around items-center'>
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

export default SelectableTitleList;
