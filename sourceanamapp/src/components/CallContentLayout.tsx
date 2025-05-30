import React from "react";
import CallInfo from "./CallInfo";
import CallPreview from "./CallPreview";

const CallContentLayout: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Info panel - left */}
      <div className="md:col-span-1">
        <CallInfo />
      </div>

      {/* Video/preview panel - right */}
      <div className="md:col-span-2">
        <CallPreview />
      </div>
    </div>
  );
};

export default CallContentLayout;
