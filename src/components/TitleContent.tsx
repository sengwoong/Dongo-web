// Title.tsx
import React from 'react';

interface TitleProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const MenuTitle: React.FC<TitleProps> = ({ text, isSelected, onClick }) => {
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

export default MenuTitle;
