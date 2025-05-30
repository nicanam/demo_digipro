import React from "react";

const CallHeader: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">May 15, 2025</div>
        <hr className="h-4 border-l border-gray-300" />
        <div className="flex items-center">
          <span>External call</span>
          <button className="ml-2 text-gray-600 hover:text-gray-800">
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
              <path d="M7.545 10.345c.06.03.12.04.19.04l-.01-.01c.19 0 .38-.12.46-.31.1-.25-.02-.54-.27-.65a2.72 2.72 0 0 1-.99-.72c-.43-.51-.66-1.16-.63-1.83.03-.67.3-1.31.78-1.78l2.62-2.62c1.01-1 2.77-1 3.77 0 .5.49.78 1.18.78 1.88s-.28 1.38-.78 1.88l-1.24 1.24c-.2.2-.2.51 0 .71.2.2.51.2.71 0l1.24-1.24c.69-.69 1.07-1.62 1.07-2.59 0-.97-.39-1.91-1.07-2.59a3.662 3.662 0 0 0-2.59-1.07c-.98 0-1.9.38-2.59 1.07l-2.62 2.62c-.65.66-1.03 1.52-1.07 2.45-.03.92.28 1.82.88 2.52.37.44.84.78 1.36 1Z"></path>
              <path d="M1.825 14.245c.69.69 1.61 1.07 2.59 1.07l.01-.01c.97 0 1.91-.39 2.59-1.07l2.62-2.62c.65-.66 1.03-1.53 1.07-2.45.03-.92-.28-1.81-.88-2.52a3.62 3.62 0 0 0-1.36-1c-.26-.1-.55.02-.66.27-.1.26.02.55.27.66a2.657 2.657 0 0 1 1.63 2.56c-.03.67-.3 1.3-.78 1.78l-2.62 2.62c-1 1-2.77 1-3.77 0-.5-.5-.78-1.18-.78-1.88s.28-1.38.78-1.88l1.24-1.24c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.24 1.24c-.69.69-1.07 1.61-1.07 2.59 0 .98.38 1.9 1.07 2.59Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div>
        <button className="text-gray-600 hover:text-gray-800">
          <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
            <path d="M8 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default CallHeader;
