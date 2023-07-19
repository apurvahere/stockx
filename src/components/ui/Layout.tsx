import NavigationBottom from "./NavigationBottom";
import React, { ReactNode } from "react";
import classNames from "classnames";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={classNames("h-full w-full")}>
      {children}
      <div className="w-full h-max fixed bottom-0 z-[999]">
        <NavigationBottom />
      </div>
    </div>
  );
};

export default Layout;
