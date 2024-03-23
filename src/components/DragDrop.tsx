import React, {
    Dispatch,
    SetStateAction,
    useState,
    DragEvent,
    FormEvent,
    useEffect,
    useRef,
  } from "react";
  import { FiPlus, FiTrash } from "react-icons/fi";
  import { motion } from "framer-motion";
  import { FaFire } from "react-icons/fa";
import { useUpdateWordData, useWords } from "../hooks/api/my_word/my_word";
import LoadingBar from "./Portal/LoadingBar";
import { useProducts } from "../hooks/api/my_product/my_product";
import useDragProduct from '../../utils/zustant/useDragProduct'
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
    const [drop, setDrop] = useState<Number|null>(); // 초기값을 빈 배열로 설정
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
      <div className="flex flex-col h-full  select-none gap-3  p-12 max-w-screen justify-center items-center">
        <div className="flex h-32 justify-center items-center max-w-prose "> 
        <ProductList></ProductList>
        </div>
        <div className="flex w-screen  justify-around ">
          <DropMenu >
          <ColumnDrop ></ColumnDrop>
          <ColumnDrop ></ColumnDrop> 
          <BurnBarrelDrop></BurnBarrelDrop>
          </DropMenu>
      
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
      
        <BurnBarrel setCards={function (value: React.SetStateAction<CardType[]>): void {
          throw new Error("Function not implemented.");
        } }   />
        </div>
      </div>
    );
  };


  

  export default function ProductList() {
    const { data: products, fetchNextPage, hasNextPage, isFetching: isLoading } = useProducts();
    const [isEndOfScroll, setIsEndOfScroll] = useState(true);

    const { isDragging, startDragging, stopDragging } = useDragProduct();

    const productListRef = useRef<HTMLDivElement>(null);
  
    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
      const productListElement = productListRef.current;
      if (productListElement) {
        const { scrollLeft, scrollWidth, clientWidth } = productListElement;
        if (scrollLeft > scrollWidth - clientWidth - ((scrollWidth - clientWidth) / 10)) {
          loadMore();
        }
      }
    };
  
    const loadMore = () => {
      if (hasNextPage && !isLoading) {
        fetchNextPage();
      }
    };
  
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: any) => {

            e.dataTransfer.setData('productId', JSON.stringify(product)); // 드래그하는 상품 데이터를 설정합니다.
            console.log(isDragging)
            const cardId = e.dataTransfer.getData("productId");

            console.log("handleDragStart")
            console.log(cardId)
            
            startDragging()
    };
  


    const handleDragEnd = () => {
      console.log("handleDragEnd");
      stopDragging();
  };
  
    if (isLoading && !products) {
      return <div>Loading...</div>;
    }
  
    if (!products || products.pages.length === 0) {
      return <div>No products available</div>;
    }
  
    return (
      <div
        className="z-50 flex max-w-prose overflow-scroll"
        ref={productListRef}
        onWheel={handleWheel}
        onDragEnd={handleDragEnd}
      >
        {products.pages.map((pageData, pageIndex) => (
          <div key={pageIndex} className="flex flex-no-wrap">
            {pageData.content.map((product: any, productIndex: number) => (
              <div
                key={productIndex}
                className="my-4 w-24 mx-4"
                draggable // 드래그 가능하도록 설정합니다.
                onDragStart={(e) => handleDragStart(e, product)}
              >
                <h3>{product.title}</h3>
                <p>{product.content}</p>
              </div>
            ))}
          </div>
        ))}
  
        {isEndOfScroll && hasNextPage && (
          <button onClick={loadMore} className="my-4 mx-4">
            Load More
          </button>
        )}
      </div>
    );
  }

  // -----------
  function ColumnDrop() {
    const handleDragEnd = async (e:React.DragEvent<HTMLDivElement>) => {
      console.log("handleDragEnd2");
      console.log(e);

      const el = e.currentTarget;
      el.style.border = "none";


               
    const cardId = e.dataTransfer.getData("productId");
    console.log("handleDragEnd")
    console.log("handleDragEnd")
    console.log(cardId)
    console.log(cardId)
    console.log(cardId)


    };

  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // Get the element being dragged over
      const el = e.currentTarget;
      // Add a CSS class to highlight the element
      el.style.border = "2px solid yellow"
    };
  
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      const el = e.currentTarget;


      el.style.border = "none";
    };
  
    return (
      <DropZone
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragLeave={handleDragLeave} // Add onDragLeave event handler
      />
    );
  }

  


function DropZone({ onDrop, onDragOver, onDragEnd, onDragLeave}: any) {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave} // Pass onDragLeave event handler
      className="w-28 shrink-0 md:w-56 h-full min-h-screen z-50 bg-light-200"
    ></div>
  );
}


function BurnBarrelDrop() {
  return (
    <div className={` mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl`}></div>
  );
}

function DropMenu({ children }: { children: React.ReactNode }) {
  return <div className="w-screen  justify-around absolute flex ">{children}</div>;
}







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
}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const updateWordData = useUpdateWordData();
  // 드래그 시작 시 호출되는 함수
  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.wordLocal.toString());

    console.log("컬럼카드 드래그스타트")
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
  console.log("컬럼카드 드래그 끝")
  
  // 업데이트 중인 경우 동작하지 않음
  if (isUpdating) {
    return;
  }
  
  
  // 드래그된 카드의 ID 가져오기
  const cardId = e.dataTransfer.getData("cardId");
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
    console.log("업데이트종료")
    setIsUpdating(false);
  }
};


    const handleDragOver = (e: DragEvent) => {
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
    const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
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
  