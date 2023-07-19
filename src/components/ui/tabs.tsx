"use client";

import React, { useEffect, useRef, useState } from "react";

import { RippleBlue } from "../../utils/ripples";
import { TabInterface } from "../../utils/type";
import classNames from "classnames";

const Tabs = ({
  tabs,
  active,
  handler,
  className,
}: {
  tabs: TabInterface[];
  active: TabInterface;
  handler?: (tab: TabInterface) => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  const [closing, setClosing] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      setClosing(true);
      setTimeout(() => {
        setClosing(false);
        setVisible(false);
      }, 180);
    }
  }, [open]);

  useEffect(() => {
    if (closing) {
      setOpen(false);
      setTimeout(() => {
        setClosing(false);
        setVisible(false);
      }, 180);
    }
  }, [closing]);

  useEffect(() => {
    if (tabsRef.current) {
      const activeTabIndex = tabs.findIndex((tab) => tab === active);
      const activeTabNode = tabsRef.current.children[
        activeTabIndex
      ] as HTMLDivElement;
      if (activeTabNode) {
        const containerWidth = tabsRef.current.clientWidth;
        const activeTabWidth = activeTabNode.clientWidth;
        const activeTabLeft = activeTabNode.offsetLeft;
        const scrollLeft =
          activeTabLeft - containerWidth / 2 + activeTabWidth / 2;
        tabsRef.current.scrollLeft = scrollLeft;
      }
    }
  }, [active, tabs]);

  return (
    <>
      <div
        className={classNames(
          "w-full bg-blue-500 fixed top-[150px] sm:top-[160px] lg:top-[150px] z-[99]",
          className
        )}
      >
        <div
          ref={tabsRef}
          className={`min-w-[170px] tr-c bg-blue-500 top-42 border-b-1 border-black-20 top-0 p-0 flex flex-nowrap items-center justify-start lg:justify-between gap-6 relative overflow-x-scroll scrollbar-hide w-full max-w-[100vw]  ${
            closing
              ? "animate-hide lg:animate-none"
              : "animate-show lg:animate-none"
          } ${visible ? "z-50" : "block"}`}
        >
          {tabs.map((tab, key) => (
            <div
              key={key}
              className={classNames(
                "rounded-6 bg-blue-500 w-auto grid grid-cols-1 min-w-[120px] lg:min-w-[200px]",
                className
              )}
            >
              <RippleBlue>
                <button
                  className={`w-full group py-1.5 lg:py-3 px-2 lg:px-10 border-b-2 items-center justify-between lg:justify-center flex gap-6 ${
                    active === tab
                      ? "bg-blue-500 hover:bg-blue-500 border-blue-500"
                      : "hover:bg-blue-500 hover:border-blue-500 border-transparent"
                  }`}
                  onClick={() => {
                    if (tab.type !== undefined && handler) handler(tab);
                    tab && localStorage.setItem("currentTab", String(tab.type));
                    setOpen(false);
                  }}
                >
                  {tab?.icon && (
                    <div
                      className={`w-16 h-16 flex items-center justify-center ${
                        active === tab
                          ? "text-blue-500"
                          : "group-hover:text-blue-500 text-black"
                      }`}
                    >
                      {tab.icon}
                    </div>
                  )}
                  {tab?.title ? (
                    <p
                      className={`text-sm font-bold capitalize whitespace-nowrap w-full h-full ${
                        active === tab
                          ? "text-white"
                          : "group-hover:text-[#e3e3e3] text-[#e3e3e3]"
                      }`}
                    >
                      {tab.title}
                    </p>
                  ) : (
                    ""
                  )}
                </button>
              </RippleBlue>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tabs;
