import React, { useState, ChangeEvent } from 'react';
import ProductList from './components/ProductList';
import { useOptionProductFetching, useProductFetching } from '../hooks/api/product/product'; // Assuming you have defined the Product type
import { ProductSearchCriteria } from '../../utils/types';
import { queryKeys } from '../../utils/react_query/constants';
import { useQueryClient } from '@tanstack/react-query';

function DownLoad() {
  const queryClient = useQueryClient();
  const [searchCriteria, setSearchCriteria] = useState<ProductSearchCriteria>({
    type: '',
    content: '',
    downCountOrder: '',
    currentOrder: ''
  });

  // Function to handle search term change
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCriteria(prevState => ({
      ...prevState,
      content: event.target.value
    }));
  };

  // Function to handle category change
  const handleTypehange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchCriteria(prevState => ({
      ...prevState,
      type: event.target.value
    }));
  };

  
  const handleDwonhange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchCriteria(prevState => ({
      ...prevState,
      downCountOrder: event.target.value
    }));
  };


  const handleOldChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchCriteria(prevState => ({
      ...prevState,
      currentOrder: event.target.value
    }));
  };


// 서치를 눌렀을때 키를지움 
  const handleSearch = () => {

    // Perform search logic here
    console.log('Performing search...');
    queryClient.invalidateQueries({ queryKey: [queryKeys.products,"current"] }); // Adjust this as needed
    queryClient.invalidateQueries({ queryKey: [queryKeys.products,"down"] }); 
    
  };


  return (
    <div className="bg-gray-200 min-h-screen">

    <div className=" w-4/5 mx-auto p-4 bg-green-200">
      <h1 className="text-3xl font-bold mb-4 text-center">DownLoad</h1>
      <div className="flex mb-4 items-center">
        {/* Search Bar */}
        <input
          type="text"
          value={searchCriteria.content}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="border border-gray-300 px-4 py-2 mr-2 rounded-md flex-grow"
        />
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
        {/* Category Dropdown */}

        <select
          value={searchCriteria.type}
          onChange={handleTypehange}
          className="border border-gray-300 px-4 py-2 rounded-md ml-2"
        >
          <option value="">전체</option>
          <option value="JAPANESE">일어</option>
          <option value="ENGLISH">영어</option>
          {/* Add more options as needed */}
        </select>
        <select
          value={searchCriteria.currentOrder}
          onChange={handleOldChange}
          className="border border-gray-300 px-4 py-2 rounded-md ml-2"
        >
          <option value="">최근순</option>
          <option value="recent">오름차순</option>
          <option value="old">내림차순</option>
          {/* Add more options as needed */}
        </select>

        <select
          value={searchCriteria.downCountOrder}
          onChange={handleDwonhange}
          className="border border-gray-300 px-4 py-2 rounded-md ml-2"
        >
          <option value="">다운로드수</option>
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="flex flex-col justify-center items-center">
        {/* Product Lists */}
        <div className="border border-gray-300 rounded-md p-4 w-full">
          <h2 className="text-lg font-bold mb-2">검색</h2>
        <div className="flex h-32 justify-center items-center overflow-hidden">
          {/* 최신은 currentOrder 가asc downCountOrder는 영향없고 타입만 바뀌어야함 */}
          <ProductList useProductFetching={() => useOptionProductFetching({ 
            searchCriteria: { ...searchCriteria}, 
            queryAssistantKeys: "search"
          })} />
        </div>     
        </div>


        <div className="border border-gray-300 rounded-md p-4 w-full">
          <h2 className="text-lg font-bold mb-2">최신</h2>
        <div className="flex h-32 justify-center items-center overflow-hidden">
          {/* 최신은 currentOrder 가asc downCountOrder는 영향없고 타입만 바뀌어야함 */}
          <ProductList useProductFetching={() => useOptionProductFetching({ 
            searchCriteria: { ...searchCriteria, currentOrder: "recent" ,downCountOrder:'' }, 
            queryAssistantKeys: "current"
          })} />
        </div>     
        </div>
        <div className="border border-gray-300 rounded-md p-4 w-full">
          <h2 className="text-lg font-bold mb-2">가장 많이 다운로드된 문제 와 단어 </h2>
        <div className="flex h-32 justify-center items-center">
          {/* 최신은 downCountOrder 가asc currentOrder 가 영향없고 타입만 빠궈야함*/}
          <ProductList useProductFetching={() => useOptionProductFetching({ 
            searchCriteria: { ...searchCriteria, currentOrder: "" ,downCountOrder:'asc' }, 
            queryAssistantKeys: "down"
          })} />
        </div>  
         
        </div>
        <div className="border border-gray-300 rounded-md p-4 w-full">
          <h2 className="text-lg font-bold mb-2">GM추천 단어</h2>
          <div className="flex h-32 justify-center items-center">
          <ProductList useProductFetching={() => useOptionProductFetching({ searchCriteria,queryAssistantKeys:"gm" })} />
          </div> 
        </div>
        <div className="border border-gray-300 rounded-md p-4 w-full overflow-hidden">
          <h2 className="text-lg font-bold mb-2">추천 책자</h2>
          <ProductList useProductFetching={useProductFetching} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default DownLoad;
