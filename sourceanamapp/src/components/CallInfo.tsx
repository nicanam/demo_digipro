import React from "react";

const CallInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Meeting Details */}
      <div className="space-y-4">
        <div className="grid grid-cols-[120px_1fr] items-start">
          <span className="text-gray-500 text-sm">Call title</span>
          <div className="flex items-center">
            <div>Sales call with CTO</div>
            <button className="ml-2 text-gray-400 hover:text-gray-600">
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                <g fillRule="evenodd" clipRule="evenodd">
                  <path d="M13.062 0a2.926 2.926 0 0 1 2.084.852l-.353.355.355-.353a2.925 2.925 0 0 1-.026 4.154l-9.665 9.665a.5.5 0 0 1-.23.13L.625 15.985a.5.5 0 0 1-.608-.608l1.18-4.603a.5.5 0 0 1 .13-.23L10.991.878A2.927 2.927 0 0 1 13.061 0Zm1.378 1.56a1.925 1.925 0 0 0-2.736.02l-.004.004-9.57 9.57-.936 3.652 3.653-.937 9.57-9.57.002-.002.002-.002a1.925 1.925 0 0 0 .019-2.735Z"></path>
                  <path d="M10.717 1.153a.5.5 0 0 1 .707 0l3.423 3.423a.5.5 0 1 1-.707.707L10.717 1.86a.5.5 0 0 1 0-.707ZM1.327 10.543a.5.5 0 0 1 .707 0l3.426 3.42a.5.5 0 0 1-.707.707l-3.426-3.42a.5.5 0 0 1 0-.707Z"></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[120px_1fr] items-start">
          <span className="text-gray-500 text-sm">Call time</span>
          <div>May 15, 2025, 12:00 AM PDT</div>
        </div>
        <div className="grid grid-cols-[120px_1fr] items-start">
          <span className="text-gray-500 text-sm">Scheduled on</span>
          <span>Google Meet</span>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Accounts */}
      <div>
        <div className="flex justify-between">
          <span className="text-gray-500 text-sm">Account</span>
          <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
            <svg
              viewBox="0 0 16 16"
              className="w-4 h-4 mr-1"
              fill="currentColor"
            >
              <path d="M7.545 10.345c.06.03.12.04.19.04l-.01-.01c.19 0 .38-.12.46-.31.1-.25-.02-.54-.27-.65a2.72 2.72 0 0 1-.99-.72c-.43-.51-.66-1.16-.63-1.83.03-.67.3-1.31.78-1.78l2.62-2.62c1.01-1 2.77-1 3.77 0 .5.49.78 1.18.78 1.88s-.28 1.38-.78 1.88l-1.24 1.24c-.2.2-.2.51 0 .71.2.2.51.2.71 0l1.24-1.24c.69-.69 1.07-1.62 1.07-2.59 0-.97-.39-1.91-1.07-2.59a3.662 3.662 0 0 0-2.59-1.07c-.98 0-1.9.38-2.59 1.07l-2.62 2.62c-.65.66-1.03 1.52-1.07 2.45-.03.92.28 1.82.88 2.52.37.44.84.78 1.36 1Z"></path>
              <path d="M1.825 14.245c.69.69 1.61 1.07 2.59 1.07l.01-.01c.97 0 1.91-.39 2.59-1.07l2.62-2.62c.65-.66 1.03-1.53 1.07-2.45.03-.92-.28-1.81-.88-2.52a3.62 3.62 0 0 0-1.36-1c-.26-.1-.55.02-.66.27-.1.26.02.55.27.66a2.657 2.657 0 0 1 1.63 2.56c-.03.67-.3 1.3-.78 1.78l-2.62 2.62c-1 1-2.77 1-3.77 0-.5-.5-.78-1.18-.78-1.88s.28-1.38.78-1.88l1.24-1.24c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.24 1.24c-.69.69-1.07 1.61-1.07 2.59 0 .98.38 1.9 1.07 2.59Z"></path>
            </svg>
            Associate
          </button>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Participants */}
      <div>
        <button className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-50 rounded-md">
          <div className="flex items-center">
            <svg
              viewBox="0 0 16 16"
              className="w-5 h-5 text-gray-600 mr-2"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5 2.17A1.67 1.67 0 0 0 11.83.5H2.17A1.67 1.67 0 0 0 .5 2.17v9.66a1.67 1.67 0 0 0 1.67 1.67v-1a.67.67 0 0 1-.67-.67V2.17a.67.67 0 0 1 .67-.67h9.66a.67.67 0 0 1 .67.67h1Zm2 2.903A1.573 1.573 0 0 0 13.927 3.5H5.073A1.573 1.573 0 0 0 3.5 5.073v8.854A1.573 1.573 0 0 0 5.073 15.5h8.854a1.573 1.573 0 0 0 1.573-1.573V5.073Zm-1.168-.405a.573.573 0 0 1 .168.405v8.854a.573.573 0 0 1-.573.573H5.073a.573.573 0 0 1-.573-.573V5.073a.573.573 0 0 1 .573-.573h8.854a.57.57 0 0 1 .405.168Z"
              ></path>
            </svg>
            Copy email addresses
          </div>
          <svg
            viewBox="0 0 16 16"
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
          >
            <path d="M7.986 10.49a.71.71 0 0 1-.565-.267L4.128 6.531c-.2-.266-.166-.665.1-.864.266-.2.632-.2.832.066l2.86 3.26c.033.033.066.033.133 0l2.86-3.26c.233-.266.599-.3.865-.066.266.232.3.598.066.864l-.033.034-3.26 3.691a.868.868 0 0 1-.565.233Z"></path>
          </svg>
        </button>

        <div className="mt-4">
          <h4 className="font-semibold mb-1">Anam Ai Partner</h4>
          <div className="text-gray-500 text-sm mb-3">Participants</div>

          <div className="flex items-center justify-between border-l-4 border-blue-500 pl-2 py-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                HS
              </div>
              <span>Harriett Seabrook (Junior Sales Rep - Anam AI)</span>
            </div>
            <div className="text-xs text-gray-500">Host</div>
          </div>

          <div className="flex items-center justify-between border-l-4 border-blue-500 pl-2 py-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                LT
              </div>
              <span>Logan Tanner (CEO - Fictional Tech Company)</span>
            </div>
            <div className="text-xs text-gray-500">Guest</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallInfo;
