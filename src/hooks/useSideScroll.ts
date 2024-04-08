import { useRef, useEffect, RefObject } from "react";

interface UseHorizontalScrollProps {
  speed?: number;
}

export function useHorizontalScroll({ speed = 1 }: UseHorizontalScrollProps): RefObject<HTMLDivElement> {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;

    if (el) {
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * speed,
          behavior: "smooth"
        });
        console.log(el.scrollLeft + e.deltaY * speed);
      };

      el.addEventListener("wheel", onWheel);

      return () => {
        el.removeEventListener("wheel", onWheel);
      };
    }
  }); // 의존성 배열 비워둠

  return elRef;
}
