"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

import classNames from "classnames";
import { TbChartPie, TbArrowsUpDown, TbNews } from "react-icons/tb";

const NavigationBottom = () => {
  const pathname = usePathname();
  const param = useParams();

  const NavigationItem = ({
    title,
    icon,
    link,
  }: {
    title: string;
    icon: JSX.Element;
    link: string;
  }) => {
    return (
      <Link href={link}>
        <span
          className={classNames(
            "flex flex-col items-center justify-center px-2",
            (pathname === `${link}/${param?.stockId}` || pathname === link) &&
              "text-blue-500 font-bold"
          )}
        >
          {icon}
          <p className="text-sm font-semibold">{title}</p>
        </span>
      </Link>
    );
  };

  return (
    <div className="border-t bg-white px-2 py-1.5 flex justify-center items-center w-full h-full">
      <div className="w-full h-full flex justify-between items-center max-w-xs">
        <NavigationItem
          title="Portfolio"
          icon={<TbChartPie className="text-xl font-semibold" />}
          link="/"
        />
        <NavigationItem
          title="Market"
          icon={<TbArrowsUpDown className="text-xl font-semibold" />}
          link={pathname === "/" ? "/stock/1" : "/stock"}
        />
        <NavigationItem
          title="News"
          icon={<TbNews className="text-xl font-semibold" />}
          link="/news"
        />
      </div>
    </div>
  );
};

export default NavigationBottom;
