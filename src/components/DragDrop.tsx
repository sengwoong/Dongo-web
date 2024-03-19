import React, {
    Dispatch,
    SetStateAction,
    useState,
    DragEvent,
    FormEvent,
    useEffect,
  } from "react";
  import { FiPlus, FiTrash } from "react-icons/fi";
  import { DragHandlers, motion } from "framer-motion";
  import { FaFire } from "react-icons/fa";
import { useUpdateWordData, useWords } from "../hooks/api/my_word/my_word";
import { ClipLoader } from "react-spinners";
import LoadingBar from "./Portal/LoadingBar";
  export const CustomKanban = () => {
    return (
      <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-neutral-900 text-neutral-50">
        <Board />
      </div>
    );
  };

  const Board = () => {
    const { word, isLoading, isError } = useWords(3); // ProductId로 3을 전달하여 useWords를 호출합니다.
    const [cards, setCards] = useState<CardType[]>([]); // 초기값을 빈 배열로 설정

    useEffect(() => {
      if (word) {
        setCards(word);
      }
    }, [word]); // word가 변경될 때마다 useEffect가 호출되어 cards를 업데이트


  if (isLoading) {
      return <div>Loading...</div>; // 데이터 로딩 중에는 "Loading..." 표시
  }

  if (isError) {
      return <div>Error occurred while fetching data</div>; // 데이터 로드 중 에러 발생 시 에러 메시지 표시
  }



    
  // 컬럼은 최대 3개까지해서 드래그드롭으로 단어장끌고와서 옮기기 가능하게하기 이떄 가로스크롤하기
  // 입력에 단어및 내용넣게하기
  // 끝나면 뮤테이트로 해당값을넣거 디비에서 handleDragEnd 에서 값을바꾸기
    return (
      <div className="flex h-ful  select-none gap-3  p-12">
        <Column
          title="TODO"
          column={3}
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="In progress"
          column={4}
          headingColor="text-blue-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Complete"
          column={5}
          headingColor="text-emerald-200"
          cards={cards}
          setCards={setCards}
        />
        <BurnBarrel setCards={function (value: React.SetStateAction<CardType[]>): void {
          throw new Error("Function not implemented.");
        } }   />
      </div>
    );
  };


  
type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: number;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [change, setChange] = useState(false);
  const updateWordData = useUpdateWordData();
  // 드래그 시작 시 호출되는 함수
  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.wordLocal.toString());
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
const handleDragEnd = async (e: DragEvent) => {
  // 업데이트 중인 경우 동작하지 않음
  if (isUpdating) {
    return;
  }
  

  // 드래그된 카드의 ID 가져오기
  const cardId = e.dataTransfer.getData("cardId");
  setIsUpdating(true);
  setActive(false);
  clearHighlights();

  // 드롭된 위치에 가장 가까운 인디케이터 찾기
  const indicators = getIndicators();
  const { element } = getNearestIndicator(e, indicators);
  const before = element.dataset.before || "-1";

  // 미리보기 (실행과정 Js)
  // let updatedTasks;

  // // 드롭된 위치가 컬럼 상단인 경우
  // if (Number(before) === -1) {
  //   updatedTasks = reset(cards, cardId);
  // } else {
  //   // 컬럼 내부에서의 위치 변경인 경우
  //   updatedTasks = cards.map((card) => {
  //     if (card.wordLocal.toString() === cardId) {
  //       return { ...card, wordLocal: Number(before) };
  //     } else if (card.wordLocal.toString() === before) {
  //       return { ...card, wordLocal: Number(cardId) };
  //     }
  //     return card;
  //   });
  // }

  // 업데이트된 카드 상태 설정
  // setCards(updatedTasks);

  try {
    // 백엔드로 업데이트 요청 보내기
    await update(column, before, cardId);
    console.log("Update successful!");
  } catch (error) {
    console.error("Update failed:", error);
    // 롤백 또는 에러 처리
  } finally {
    console.log("업데이트종료")
    setIsUpdating(false);
  }
};





  // 카드의 순서를 초기화하는 함수
  const reset = (cards: CardType[], cardId: string) => {
    let maxWordId = 0;
    if (cards.length > 0) {
      maxWordId = Math.max(...cards.map((card) => card.wordLocal)) + 1;
    }

    return cards.map((card) => {
      if (card.wordLocal.toString() === cardId) {
        return { ...card, wordLocal: maxWordId };
      } else {
        return { ...card };
      }
    });
  };





    const handleDragOver = (e: DragEvent) => {
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
    const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
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
  
  type CardProps = CardType & {
    handleDragStart: Function;
    column:number;
  };
  
  const Card = ({ word,definition, wordLocal, column, handleDragStart }: CardProps) => {
    return (
      <>
        <DropIndicator beforeId={wordLocal.toString()} column={column} />
        <motion.div
          layout
          layoutId={wordLocal.toString()}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { word,definition, wordLocal, column })}
          className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
        >
          <p className="text-sm text-neutral-100">{word}</p>
          <p className="text-sm text-neutral-100">{definition}</p>
        </motion.div>
      </>
    );
  };
  
  type DropIndicatorProps = {
    beforeId: string | null;
    column: number;
  };
  
  const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={column}
        className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
      />
    );
  };
  
  const BurnBarrel = ({
    setCards,
  }: {
    setCards: Dispatch<SetStateAction<CardType[]>>;
  }) => {
    const [active, setActive] = useState(false);
  
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setActive(true);
    };
  
    const handleDragLeave = () => {
      setActive(false);
    };
  
    const handleDragEnd = (e: DragEvent) => {
  // todo 단어 지우기
        console.log("쓰레기 통으로")
      const cardId = e.dataTransfer.getData("cardId");
      setCards((pv) => pv.filter((c) => c.product_id.toString() !== cardId));
  
      setActive(false);
    };
  
    return (
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
          active
            ? "border-red-800 bg-red-800/20 text-red-500"
            : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
        }`}
      >
        {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
      </div>
    );
  };
  
  type AddCardProps = {
    column: number;
  };
  
  const AddCard = ({ column }: AddCardProps) => {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!text.trim().length) return;
  
      const newCard = {
        column,
        title: text.trim(),
        id: Math.random().toString(),
      };
  
      // setCards((pv) => [...pv, newCard]);
  
      setAdding(false);
    // 수정
    };
  
    return (
      <>
        {adding ? (
          <motion.form layout onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setText(e.target.value)}
              autoFocus
              placeholder="Add new task..."
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <button
                onClick={() => setAdding(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Add</span>
                <FiPlus />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.button
            layout
            onClick={() => setAdding(true)}
            className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
          >
            <span>Add card</span>
            <FiPlus />
          </motion.button>
        )}
      </>
    );
  };
  
  type CardType = {
    word_id: number;
    word: string;
    definition:string;
    product_id: number;
    wordLocal:number
  };
  