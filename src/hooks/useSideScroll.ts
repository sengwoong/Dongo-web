import { useRef, useEffect, RefObject } from "react";

export function useHorizontalScroll({speed = 1}:{speed:number}): RefObject<HTMLDivElement> {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;

    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft*speed + e.deltaY,
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
