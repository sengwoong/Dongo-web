
import { create } from 'zustand' // create로 zustand를 불러옵니다.

interface DragProductState {
  isDragging: boolean;
  startDragging: () => void;
  stopDragging: () => void;
  productsNum: { [key: number]: number|null };
  updateProductNum: (productId: number, quantity: number) => void;
}

const useDragProduct = create<DragProductState>(set => ({
  isDragging: false,
  startDragging: () => set({ isDragging: true }),
  stopDragging: () => set({ isDragging: false }),
  productsNum: { 1: null, 2: null },
  updateProductNum: (productId, quantity) =>
    set(state => ({
      productsNum: { ...state.productsNum, [productId]: quantity }
    }))
}));

export default useDragProduct

