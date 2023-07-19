"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { NextPageWithLayout } from "@/app/_app";

import { MdKeyboardArrowLeft } from "react-icons/md";
import classNames from "classnames";
import toast from "react-hot-toast";

import { listAllJuniorMarket, listAllMainMarket } from "@/api/functions";
import { onLoading } from "@/api/onLoading";
import {
  ChartDataProps,
  MainMarketProps,
  PriceDetailsProps,
} from "@/utils/type";
import { categoriesLine } from "@/utils/helper";
import { Loader, LineChart } from "@/components/ui";

const StockDetail: NextPageWithLayout = () => {
  const { stockId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<[]>([]);
  const [historicalData, setHistoricalData] = useState<ChartDataProps>([]);
  const [activeRange, setActiveRange] = useState("1D");
  const [tabType] = useState<number>(() => {
    const storedTabType = localStorage.getItem("currentTab");
    return storedTabType ? JSON.parse(storedTabType) : 0;
  });

  useEffect(() => {
    onLoading(loading, setLoading, async () => {
      try {
        let result;
        if (tabType === 0 || tabType === 2) {
          result = await listAllMainMarket();
        } else if (tabType === 1 || tabType === 3) {
          result = await listAllJuniorMarket();
        } else {
          throw new Error("Invalid tab type.");
        }
        let stockData = result.filter(
          (stock: MainMarketProps) => stock.id === stockId
        );
        setChartData(stockData);
        setHistoricalData(stockData[0].stockGraph);
        if (!result || !result.data) throw new Error("Something went wrong.");
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  useEffect(() => {
    const dataByRange = [
      {
        data: Array.from(
          {
            length:
              activeRange === "1D"
                ? 10
                : activeRange === "7D"
                ? 20
                : activeRange === "1M"
                ? 25
                : activeRange === "3M"
                ? 30
                : 45,
          },
          () => Math.floor(Math.random() * 10) + 1
        ),
      },
    ];

    setHistoricalData(dataByRange);
  }, [activeRange]);

  const PriceDetails = ({ title, price, hasSymbol }: PriceDetailsProps) => {
    return (
      <div className="flex justify-between items-center w-full h-full px-5 py-1.5">
        <h2 className="text-sm font-normal capitalize">{title}</h2>
        <span className="text-sm font-bold">
          {hasSymbol ? "$" : ""}
          {price}
        </span>
      </div>
    );
  };

  const notify = () =>
    toast.success("Stock added to portfolio.", {
      position: "top-right",
    });

  const RangeSelector = ({ range }: { range: string }) => {
    return (
      <span
        className={classNames(
          "h-8 w-8 flex items-center justify-center border font-inter rounded-full text-xs",
          activeRange === range
            ? "bg-black text-white font-semibold text-sm"
            : ""
        )}
        onClick={() => setActiveRange(range)}
      >
        {range}
      </span>
    );
  };

  return (
    <div className="w-full h-full pb-14">
      {chartData.length ? (
        chartData.map((data: MainMarketProps, index) => (
          <div
            key={index}
            className="w-full h-full max-w-4xl lg:py-10 lg:mx-auto"
          >
            <div className="flex flex-col lg:flex-row justify-between min-h-max gap-2.5 lg:gap-0 lg:min-h-min w-full h-full lg:border lg:p-2 lg:rounded-md ">
              <div className="flex flex-col justify-between lg:justify-start w-full h-full lg:border-r">
                <div className="flex justify-center items-center w-full h-full py-2.5 px-5">
                  <div
                    className="px-1.5 py-2 border w-max rounded-xl cursor-pointer"
                    onClick={() => router.back()}
                  >
                    <MdKeyboardArrowLeft />
                  </div>
                  <div className="flex flex-col justify-center items-start w-full h-full px-5">
                    <h2 className="text-lg font-semibold">
                      {data.stockSymbol}
                    </h2>
                    <span className="text-xs font-normal">
                      {data.stockName}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full h-full px-5 py-2.5">
                  <div className="flex flex-col justify-center items-start w-full h-full">
                    <h2 className="text-2xl font-semibold">
                      $ {data.currentPrice}
                    </h2>
                    <span
                      className={classNames(
                        "text-xs font-normal",
                        data.returnsPercent.charAt(0) === "-"
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                    >
                      {data.returnsPercent.charAt(0) === "-" ? "-" : "+"} $
                      {data.returnsAmount}({data.returnsPercent})
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full h-full py-2.5">
                  <LineChart
                    data={historicalData}
                    categories={categoriesLine}
                    chartType="line"
                    chartTitle=""
                    gradient
                    showLineOnly
                    markers={false}
                    showDataPoints={false}
                    tooltip
                    height={150}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex justify-between gap-5 max-w-xs items-center">
                    <RangeSelector range="1D" />
                    <RangeSelector range="7D" />
                    <RangeSelector range="1M" />
                    <RangeSelector range="3M" />
                    <RangeSelector range="1Y" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-center lg:justify-start w-full h-full lg:py-5">
                <div className="w-full h-full max-w-md">
                  <PriceDetails title="close price" price={data.closingPrice} />
                  <PriceDetails
                    title="last trade price"
                    price={data.lastTradePrice}
                  />
                  <PriceDetails title="outstanding" price={data.outStanding} />
                  <PriceDetails
                    title="market value"
                    price={data.currentMarketPrice}
                    hasSymbol
                  />
                </div>
                <div className="w-full h-full flex justify-center items-center py-2.5 lg:py-3 px-5 max-w-md">
                  <Link
                    href="/"
                    className="w-full py-1.5 bg-black text-white rounded-lg flex justify-center items-center"
                    onClick={() => notify()}
                  >
                    Add to portfolio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Loader height={50} width={50} />
      )}
    </div>
  );
};

export default StockDetail;
