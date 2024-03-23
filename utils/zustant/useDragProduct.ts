
import { create } from 'zustand' // create로 zustand를 불러옵니다.

interface DragProductState {
  isDragging: boolean;
  startDragging: () => void;
  stopDragging: () => void;
}


const useDragProduct = create<DragProductState>(set => ({
  isDragging: false,
  startDragging: () => set({ isDragging: true }),
  stopDragging: () => set({ isDragging: false }),
}));


export default useDragProduct

