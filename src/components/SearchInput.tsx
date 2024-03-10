// components/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput: React.FC<InputProps> = (props) => {
  return (
    <input
      className="py-2 px-4 rounded border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      {...props}
    />
  );
}





interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SearchButton: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      {...props}
    />
  );
}
