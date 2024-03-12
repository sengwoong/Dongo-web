import React, {
    Dispatch,
    SetStateAction,
    useState,
    DragEvent,
    FormEvent,
  } from "react";
  import { FiPlus, FiTrash } from "react-icons/fi";
  import { DragHandlers, motion } from "framer-motion";
  import { FaFire } from "react-icons/fa";
  
  export const CustomKanban = () => {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-neutral-900 text-neutral-50">
        <Board />
      </div>
    );
  };
  
  const Board = () => {
    const [cards, setCards] = useState(DEFAULT_CARDS);
  // 컬럼은 최대 3개까지해서 드래그드롭으로 단어장끌고와서 옮기기 가능하게하기 이떄 가로스크롤하기
  // 입력에 단어및 내용넣게하기
  // 끝나면 뮤테이트로 해당값을넣거 디비에서 handleDragEnd 에서 값을바꾸기
    return (
      <div className="flex h-ful  select-none gap-3  p-12">
        <Column
          title="TODO"
          column="todo"
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="In progress"
          column="doing"
          headingColor="text-blue-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Complete"
          column="done"
          headingColor="text-emerald-200"
          cards={cards}
          setCards={setCards}
        />
        <BurnBarrel setCards={setCards} />
      </div>
    );
  };
  
  type ColumnProps = {
    title: string;
    headingColor: string;
    cards: CardType[];
    column: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
  };
  
  const Column = ({
    title,
    headingColor,
    cards,
    column,
    setCards,
  }: ColumnProps) => {
    const [active, setActive] = useState(false);
  
    const handleDragStart = (e: DragEvent, card: CardType) => {  
      e.dataTransfer.setData("cardId", card.id);
      // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData 을 보면 알겠지만 드래그 드롭기능을 하기위해 있다.
    };
  
    const handleDragEnd = (e:DragEvent) => {
        const cardId = e.dataTransfer.getData("cardId");
    
        setActive(false);
        clearHighlights();
    
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);
    
        const before = element.dataset.before || "-1";
    
        if (before !== cardId) {
          let copy = [...cards];
    
          let cardToTransfer = copy.find((c) => c.id === cardId);
          if (!cardToTransfer) return;
          cardToTransfer = { ...cardToTransfer, column };
    
          copy = copy.filter((c) => c.id !== cardId);
    
          const moveToBack = before === "-1";
    
          if (moveToBack) {
            console.log("untrush")
            console.log(moveToBack)
            copy.push(cardToTransfer);
          } else {
            console.log("trush")
            console.log("trush")
            console.log("trush")
            const insertAtIndex = copy.findIndex((el) => el.id === before);
            if (insertAtIndex === undefined) return;
    
            copy.splice(insertAtIndex, 0, cardToTransfer);
          }
    
          // 원본을 삭제하기
          // 해당원본을 id 와 컬럼을 가지고 산입하기
          // 그러므로 뮤테이트로 post 요청으로 원본아이디와 바꿔야할 원본을 바디로 보내서 기존원본아이디로 삭제이후 
          // 바디에 보낸원본을 다시재등록하기 
          setCards(copy);
        }
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
      
      // 함수를 호출하여 모든 요소에서 'transform' 클래스를 제거합니다.
      removeTransformFromElements();
      
      


      

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
  
    const filteredCards = cards.filter((c) => c.column === column);
  
    return (
      <div className="w-28 shrink-0 md:w-56">
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
          {filteredCards.map((c) => {
            return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
          })}
          <DropIndicator beforeId={null} column={column} />
          <AddCard column={column} setCards={setCards} />
          <div onClick={removeTransformFromElements}>aaa</div>
        </div>
      </div>
    );
  };
  
  type CardProps = CardType & {
    handleDragStart: Function;
  };
  
  const Card = ({ title, id, column, handleDragStart }: CardProps) => {
    return (
      <>
        <DropIndicator beforeId={id} column={column} />
        <motion.div
          layout
          layoutId={id}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { title, id, column })}
          className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
        >
          <p className="text-sm text-neutral-100">{title}</p>
        </motion.div>
      </>
    );
  };
  
  type DropIndicatorProps = {
    beforeId: string | null;
    column: string;
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
        // 쓰레기
        console.log("쓰레기 통으로")
      const cardId = e.dataTransfer.getData("cardId");
      setCards((pv) => pv.filter((c) => c.id !== cardId));
  
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
    column: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
  };
  
  const AddCard = ({ column, setCards }: AddCardProps) => {
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
  
      setCards((pv) => [...pv, newCard]);
  
      setAdding(false);
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
  
  type ColumnType = "backlog" | "todo" | "doing" | "done";
  
  type CardType = {
    title: string;
    id: string;
    column: ColumnType;
  };
  
  // 백로그는 없고
  // 컬럼은 단어장 이름
  // Id 는추가하기
  // 타이틀은 내용인데 타일틀을 이름과 내용으로 나눠야함
  const DEFAULT_CARDS: CardType[] = [

    // TODO
    {
      title: "Research DB options for new microservice",
      id: "5",
      column: "todo",
    },
    { title: "Postmortem for outage", id: "6", column: "todo" },
    { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },
  
    // DOING
    {
      title: "Refactor context providers to use Zustand",
      id: "8",
      column: "doing",
    },
    { title: "Add logging to daily CRON", id: "9", column: "doing" },
    // DONE
    {
      title: "Set up DD dashboards for Lambda listener",
      id: "10",
      column: "done",
    },
  ];