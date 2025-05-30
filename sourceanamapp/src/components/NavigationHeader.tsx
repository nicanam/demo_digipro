import React from "react";

const NavigationHeader: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">Sales call with CTO</h2>
        <button className="ml-2 text-gray-500 hover:text-gray-700">
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
            <g fillRule="evenodd" clipRule="evenodd">
              <path d="M13.062 0a2.926 2.926 0 0 1 2.084.852l-.353.355.355-.353a2.925 2.925 0 0 1-.026 4.154l-9.665 9.665a.5.5 0 0 1-.23.13L.625 15.985a.5.5 0 0 1-.608-.608l1.18-4.603a.5.5 0 0 1 .13-.23L10.991.878A2.927 2.927 0 0 1 13.061 0Zm1.378 1.56a1.925 1.925 0 0 0-2.736.02l-.004.004-9.57 9.57-.936 3.652 3.653-.937 9.57-9.57.002-.002.002-.002a1.925 1.925 0 0 0 .019-2.735Z"></path>
              <path d="M10.717 1.153a.5.5 0 0 1 .707 0l3.423 3.423a.5.5 0 1 1-.707.707L10.717 1.86a.5.5 0 0 1 0-.707ZM1.327 10.543a.5.5 0 0 1 .707 0l3.426 3.42a.5.5 0 0 1-.707.707l-3.426-3.42a.5.5 0 0 1 0-.707Z"></path>
            </g>
          </svg>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="flex items-center border border-gray-300 rounded-full pl-8 pr-2 py-1">
            <svg
              viewBox="0 0 16 16"
              className="w-4 h-4 absolute left-2"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.324 8.756a4.905 4.905 0 1 1 9.029-3.837 4.905 4.905 0 0 1-9.03 3.837ZM4.45 1.218a6.105 6.105 0 1 0 6.26 10.341l3.866 3.865a.6.6 0 0 0 .848-.848L11.56 10.71a6.105 6.105 0 0 0-7.11-9.492Z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Search account, people..."
              className="bg-transparent outline-none text-sm w-48"
            />
          </div>
        </div>
        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
          <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
            <path d="M0 2a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM6 2a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM12 2a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM0 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM6 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM12 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM0 14a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM6 14a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM12 14a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"></path>
          </svg>
        </button>
        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full relative">
          <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
            <path d="M8.155 2.756A2.25 2.25 0 0 0 5.75 5a.75.75 0 0 1-1.5 0 3.75 3.75 0 1 1 5 3.536.75.75 0 0 0-.5.707v1.007a.75.75 0 0 1-1.5 0V9.244a2.251 2.251 0 0 1 1.5-2.122 2.25 2.25 0 0 0-.595-4.366ZM8 12.5a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Z"></path>
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            10
          </span>
        </button>
        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
          HS
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
