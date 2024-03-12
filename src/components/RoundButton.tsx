
interface RoundButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
  }
  
export const RoundBlueButton: React.FC<RoundButtonProps> = ({ children, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {children}
      </button>
    );
  };
