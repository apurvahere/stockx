"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { onLoading } from "@/api/onLoading";
import { listAllJuniorMarket } from "@/api/functions";
import { MainMarketProps } from "@/utils/type";
import LineChart from "./LineChart";
import Skeleton from "./Skeleton";

import classNames from "classnames";
import { CgSmileNone } from "react-icons/cg";
import { categoriesLine } from "@/utils/helper";

const JuniorMarket = ({ search }: { search: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<[]>([]);

  useEffect(() => {
    onLoading(loading, setLoading, async () => {
      try {
        let result = await listAllJuniorMarket();
        setChartData(result);
        if (!result || !result.data) throw new Error("Something went wrong.");
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  const filteredChartData = chartData?.filter((data: MainMarketProps) =>
    data.stockName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-5 py-10 lg:py-14 flex flex-col gap-5 justify-center items-center w-full h-full">
      {filteredChartData?.length > 0 ? (
        filteredChartData?.map((chartData: MainMarketProps, index) => (
          <div key={index} className="border rounded-lg w-full max-w-md">
            <Link href={`/stock/${chartData.id}`}>
              <div className="flex justify-between items-center w-full py-2 px-5">
                <div className="flex flex-col justify-between items-start">
                  <h2 className="text-base font-semibold font-inter text-black whitespace-nowrap min-w-[75px] lg:min-w-[150px] truncate max-w-[75px] lg:max-w-[150px]">
                    {chartData?.stockSymbol}
                  </h2>
                  <p className="text-xs font-normal font-inter text-gray-400 whitespace-nowrap min-w-[75px] lg:min-w-[150px] truncate max-w-[75px] lg:max-w-[150px]">
                    {chartData?.stockName}
                  </p>
                </div>
                <div className="hidden lg:flex flex-col justify-between items-start">
                  <LineChart
                    data={chartData?.stockGraph}
                    categories={categoriesLine}
                    chartType="line"
                    chartTitle=""
                    gradient
                    showLineOnly
                    markers={false}
                    showDataPoints={false}
                    tooltip={false}
                    height={100}
                    width={100}
                    showNegative={
                      chartData.returnsPercent.charAt(0) === "-" ? true : false
                    }
                    showPositive={
                      chartData.returnsPercent.charAt(0) !== "-" ? true : false
                    }
                  />
                </div>
                <div className="flex lg:hidden flex-col justify-between items-start">
                  <LineChart
                    data={chartData?.stockGraph}
                    categories={categoriesLine}
                    chartType="line"
                    chartTitle=""
                    gradient
                    showLineOnly
                    markers={false}
                    showDataPoints={false}
                    tooltip={false}
                    height={60}
                    width={60}
                    showNegative={
                      chartData.returnsPercent.charAt(0) === "-" ? true : false
                    }
                    showPositive={
                      chartData.returnsPercent.charAt(0) !== "-" ? true : false
                    }
                  />
                </div>
                <div className="flex flex-col justify-between items-end">
                  <h2 className="text-base font-semibold text-black font-inter whitespace-nowrap">
                    $ {chartData?.currentPrice}
                  </h2>
                  <p
                    className={classNames(
                      "text-xs font-semibold text-black font-inter",
                      chartData.returnsPercent.charAt(0) === "-"
                        ? "text-red-500"
                        : "text-green-500"
                    )}
                  >
                    {chartData?.returnsPercent.replace("-", "")}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : loading ? (
        <Skeleton skeletonCount={15} />
      ) : (
        <div className="flex flex-col gap-2.5 px-2.5 py-5 justify-center items-center">
          <CgSmileNone className="text-2xl lg:text-4xl text-gray-500" />
          <span className="text-gray-500 font-inter max-w-[60%] lg:max-w-none text-xs lg:text-lg text-center">
            No data found try changing filter
          </span>
        </div>
      )}
    </div>
  );
};

export default JuniorMarket;
