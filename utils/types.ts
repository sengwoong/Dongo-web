


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
