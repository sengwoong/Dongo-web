// components/SearchBox.tsx
import React, { useState } from 'react';
import { SearchButton, SearchInput } from './SearchInput';


interface SearchBoxProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <SearchButton type="submit">Search</SearchButton>
    </form>
  );
}

export default SearchBox;
