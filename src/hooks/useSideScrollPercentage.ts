import { useRef, useEffect, RefObject } from "react";

export function useSideScrollPercentage(): RefObject<HTMLDivElement> {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;

    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        const percentage = (el.clientWidth / el.scrollWidth) * 100; // 변경된 부분: 스크롤바의 가로 길이를 기준으로 퍼센티지 계산
        const newPosition = (el.scrollLeft / el.scrollWidth) * 100 + percentage; 
        el.scrollTo({
          left: (newPosition * el.scrollWidth) / 100,
          behavior: "smooth"
        });
      };

      el.addEventListener("wheel", onWheel);

      return () => {
        el.removeEventListener("wheel", onWheel);
      };
    }
  }, []);

  return elRef;
}
