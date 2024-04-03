export interface User {
  id: number;
  name: string;
  email: string;
  mobileNumber: string | null;
  role: string;
  createDt: string;
}
interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
export interface Product {
  id: number;
  title: string;
  content: string;
  visible: boolean | null;
  type: string;
  downloadCount: number;
  price: number;
  createdAt: string;
  user: User;
}
export interface ProductResponse {
  content: Product[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}


export type CardWordType = {
  word: string;
  definition:string;
  product_id: number;
  wordLocal:number;
  word_id: number;
};
export interface CardList {
  id: string;
  word: CardWordType[];
}
export interface WordData {
  word: CardWordType[];
  isLoading: boolean;
  isError: boolean;
}


export type CardExamType = {
  content:string;
  title: number;
  examLocal:number;
  exam_id: number;
  product_id:number;
};
export interface ExamList {
  id: string;
  exam: CardExamType[];
}
export interface ExamData {
  exam: CardExamType[];
  isLoading: boolean;
  isError: boolean;
}

export interface ProductSearchCriteria {
  type: string;
  content: string;
  downCountOrder: string;
  currentOrder: string;
}
