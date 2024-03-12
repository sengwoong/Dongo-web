// Title.tsx
import React from 'react';

interface TitleProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export const MenuTitle: React.FC<TitleProps> = ({ text, isSelected, onClick }) => {
  return (
    <span
      style={{
        cursor: 'pointer',
        fontWeight: isSelected ? 'bold' : 'normal',
        textDecoration: isSelected ? 'underline':'none',  
      }}
      
      onClick={onClick}
    >
      {text}
      &nbsp;
    </span>
  );
}



interface MiniTitleProps {
    text: string;
    onClick: () => void;
  }

  



export const MiniMenuTitle: React.FC<MiniTitleProps> = ({ text,  onClick }) => {
    return (
      <span
        className=' text-sm cursor-pointer'
        onClick={onClick}
      >
        {text}
        &nbsp;
      </span>
    );
  }
  
