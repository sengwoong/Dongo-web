import React, { useState, useRef } from 'react';
import { DraggableButton, SwhitchGrayBtn, TitleItem } from './SlideBtn';

interface SwitchButtonProps {
  titles: string[];
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ titles }) => {
  const [titleIndex, setTitleIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [offsetX, setOffsetX] = useState<number>(0);

  const buttonRef = useRef<HTMLDivElement>(null);
  const buttonSizeRef = useRef<HTMLDivElement>(null);

  const calculateOffsetX = (index: number) => {
    const totalButtonWidth = buttonRef.current?.offsetWidth || 0;
    const buttonWidth = buttonSizeRef.current?.offsetWidth || 0;
    return (index / (titles.length - 1)) * (totalButtonWidth - buttonWidth);
  };

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    if (!buttonRect) return;
    setIsDragging(true);
    const buttonWidth = buttonSizeRef.current?.offsetWidth || 0;
    let newOffsetX = event.clientX;
    setOffsetX(newOffsetX-(buttonWidth/2));
  };

  const handleDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const totalButtonWidth = buttonRef.current?.offsetWidth || 0;
    const buttonWidth = buttonSizeRef.current?.offsetWidth || 0;
    const maxOffsetX = totalButtonWidth - buttonWidth + (buttonWidth / 2);

    let newOffsetX = event.clientX;
    if (newOffsetX > maxOffsetX) {
      newOffsetX = maxOffsetX;
    }

    const nearestIndex = Math.round((offsetX / maxOffsetX) * (titles.length));

    const clampedIndex = Math.min(Math.max(nearestIndex, 0), (titles.length - 1));

    setTitleIndex(clampedIndex);
    setOffsetX(newOffsetX - (buttonWidth / 2));
  };

  const handleDragEnd = () => {
    moveToNearestPosition();
    setIsDragging(false);
  };

  const moveToNearestPosition = () => {
    setOffsetX(calculateOffsetX(titleIndex));
  };

  // 제목 클릭 이벤트 핸들러
  const handleTitleClick = (index: number) => {
    setTitleIndex(index);
    setOffsetX(calculateOffsetX(index));
  };

  return (
    <SwhitchGrayBtn
      handleDragStart={handleDragStart}
      handleDrag={handleDrag}
      handleDragEnd={handleDragEnd}
      buttonRef={buttonRef}
    >
      <DraggableButton
        offsetX={offsetX}
        buttonSizeRef={buttonSizeRef}
      />

      {titles.map((title, index) => (
        <div className='flex justify-center items-center w-full' key={index}>
          <TitleItem
            title={title}
            isSelected={index === titleIndex}
            onClick={() => handleTitleClick(index)}
          />
        </div>
      ))}
    </SwhitchGrayBtn>
  );
};

export default SwitchButton;
