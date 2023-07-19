"use client";

import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <Oval
        height={height || 100}
        width={width || 100}
        color="#00BFFF"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#BBBBBF"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};
export default Loader;
