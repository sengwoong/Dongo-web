// 드래그 버튼

interface DraggableButtonProps {
  offsetX: number;
  buttonSizeRef: React.RefObject<HTMLDivElement>;
}


// 버튼을 누를떄 파란색원의 위치가 어디있는지 측정해서 그방향으로 가는데
// 이떄 버튼은 지금 그래도 나뚜면 된다.
// 그런데 버튼을 놓았을때 버튼기준으로 어디로 많이갔는지를 구해서 한쪽방향으로 가게하니
// 타이틀을 눌렀을때 버튼의기준으로 치우쳐있는 방향으로 간다.
// 그래서 타이틀을 눌렀어도 그타이틀누렀어도 버튼이만일 해당타이틀방향으로 가져있지않는다면
// 직관적이게 타이틀을 눌러도 그방향으로가지않는다. 

export const DraggableButton: React.FC<DraggableButtonProps> = ({ offsetX,buttonSizeRef }) => {
  return (
    <div
    className="absolute inset-0  -left-50 w-1/3 h-full bg-blue-500 rounded-full transition-transform duration-300 transform"
    style={{ transform: `translateX(${offsetX}px)` }}
    ref={buttonSizeRef}
  ></div>
  );
};


// 드래그 아이템


import React from 'react';

interface TitleItemProps {
  title: string;
  isSelected: boolean;
  onClick: () => void; // 클릭 이벤트 핸들러 추가
}

export const TitleItem: React.FC<TitleItemProps> = ({ title, isSelected, onClick }) => {
  return (
    <div className="inset-0 flex items-center justify-center" onClick={onClick}> {/* onClick 이벤트 핸들러 추가 */}
      <div className={`text-lg z-20 font-bold select-none ${isSelected ? 'text-white' : 'text-gray-600'}`}>{title}</div>
    </div>
  );
};



// 드래그 배경


interface SwhitchGrayBtn {
    children: React.ReactNode;
    buttonRef: React.RefObject<HTMLDivElement>;
    handleDragStart: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleDrag: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleDragEnd: () => void;
  }
  
  export const SwhitchGrayBtn: React.FC<SwhitchGrayBtn> = ({children,buttonRef,handleDragStart,handleDrag,handleDragEnd}) => {
    return (
        <div
        className="relative w-full h-12 bg-gray-200 rounded-full  flex p-5  justify-between items-center"
        ref={buttonRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
      >
            {children}
      </div>
    );
  };
  