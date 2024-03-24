import { useState } from "react";
import { CardType } from "../../../utils/types";
import { useUpdateWordData } from "../../hooks/api/my_word/my_word";
import LoadingBar from "../Portal/LoadingBar";
import { Card, DropIndicator } from "./Card";
import { AddCard } from "./AddCard";

type ColumnProps = {
    title: string;
    headingColor: string;
    cards: CardType[];
    column: number;
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  };
  
 export const Column = ({
    title,
    headingColor,
    cards,
    column,
  }: ColumnProps) => {
    console.log("cardscards")
    console.log(cards)
    const [active, setActive] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const updateWordData = useUpdateWordData();
    // 드래그 시작 시 호출되는 함수
    const handleDragStart = (e: DragEvent, card: CardType) => {
        if (e.dataTransfer) {
          e.dataTransfer.setData("cardId", card.wordLocal.toString());
        }
      
        console.log("컬럼카드 드래그스타트");
      };
  
    const update = async (column:number, before:string, cardId:string) => {
      // 뮤테이트할떄 키값 안받아옴
      try {
        await updateWordData({ productId: column, before, cardId });
        // 성공했을 때 다른 작업 수행
    } catch (error) {
       //했을 때 상태를 변경하여 강제로 리렌더링 유도
    }
    }
    







    // 드래그 종료 시 호출되는 함수
const handleDragEnd: React.DragEventHandler<HTMLDivElement> = async (e) => {
    console.log("컬럼카드 드래그 끝");
    
    // 업데이트 중인 경우 동작하지 않음
    if (isUpdating) {
      return;
    }
    
    let cardId;
    if (e.dataTransfer) {
      cardId = e.dataTransfer.getData("cardId");
    }
  
    // 드래그된 카드의 ID 가져오기
    if (!cardId) {
      return;
    }
  
    setIsUpdating(true);
    setActive(false);
    clearHighlights();
  
    // 드롭된 위치에 가장 가까운 인디케이터 찾기
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || "-1";
  
    try {
      // 백엔드로 업데이트 요청 보내기
      await update(column, before, cardId);
      console.log("Update successful!");
    } catch (error) {
      console.error("Update failed:", error);
      // 롤백 또는 에러 처리
    } finally {
      console.log("업데이트종료");
      setIsUpdating(false);
    }
  };
  


  






  
      const handleDragOver = (e:any) => {
        console.log("컬럼카드 드래그 handleDragOver")
        e.preventDefault();
        highlightIndicator(e);
        setActive(true);
      };
    
      const clearHighlights = (els?: HTMLElement[]) => {
        const indicators = els || getIndicators();
    
        indicators.forEach((i) => {
          i.style.opacity = "0";
        });
      };
    
      const highlightIndicator = (e: DragEvent) => {
        const indicators = getIndicators();
    
        clearHighlights(indicators);
    
        const el = getNearestIndicator(e, indicators);
    
        el.element.style.opacity = "1";
      };
      const removeTransformFromElements = () => {
          // 모든 요소를 선택합니다.
          const elements = document.querySelectorAll('*');
          
          // 각 요소에 대해 반복합니다.
          elements.forEach(element => {
            // 요소의 클래스 목록에서 'transform' 클래스를 제거합니다.
            element.classList.remove('transform');
          });
        };
        
        
  
  
        
  // 근처에있니?
      const getNearestIndicator = (e:any, indicators: HTMLElement[]) => {
        console.log("컬럼카드 드래그 getNearestIndicator")
        const DISTANCE_OFFSET = 50;
    
        const el = indicators.reduce(
          (closest, child) => {
            const box = child.getBoundingClientRect();
    
            const offset = e.clientY - (box.top + DISTANCE_OFFSET);
    
            if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
            } else {
              return closest;
            }
          },
          {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
          }
        );
    
        return el;
      };
    
      const getIndicators = () => {
        return Array.from(
          document.querySelectorAll(
            `[data-column="${column}"]`
          ) as unknown as HTMLElement[]
        );
      };
    
      const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
      };
  
      const filteredCards = cards.filter((c) => c.product_id === column);
    
      return (
       
        <div className="w-28 shrink-0 md:w-56">
          <LoadingBar loading={isUpdating} />
  
          <div className="mb-3 flex items-center justify-between">
            <h3 className={`font-medium ${headingColor}`}>{title}</h3>
            <span className="rounded text-sm text-neutral-400">
              {filteredCards.length}
            </span>
          </div>
          <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnd={removeTransformFromElements}
            className={`h-full w-full transition-colors ${
              active ? "bg-neutral-800/50" : "bg-neutral-800/0"
            }`}
          >
            {filteredCards.sort((a, b) => a.wordLocal - b.wordLocal).map((c) => {
              return <Card column={c.product_id} key={c.wordLocal} {...c} handleDragStart={handleDragStart} />;
            })}
            <DropIndicator beforeId={null} column={column} />
            <AddCard column={column}/>
          </div>
        </div>
      );
    };
    