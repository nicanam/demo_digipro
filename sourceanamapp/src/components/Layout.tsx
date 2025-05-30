import React from "react";
import CallHeader from "./CallHeader";
import NavigationHeader from "./NavigationHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] h-screen bg-white">
      <NavigationHeader />
      <CallHeader />
      <main className="overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
