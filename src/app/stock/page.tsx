"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextPageWithLayout } from "../_app";

import { categoriesLine } from "@/utils/helper";
import LineChart from "@/components/ui/LineChart";

import { MdKeyboardArrowLeft } from "react-icons/md";
import classNames from "classnames";
import toast from "react-hot-toast";
import { ChartDataProps, PriceDetailsProps } from "@/utils/type";

const StockDetail: NextPageWithLayout = () => {
  const [activeRange, setActiveRange] = useState("1D");
  const [historicalData, setHistoricalData] = useState<ChartDataProps>([
    {
      data: Array.from(
        {
          length: 12,
        },
        () => Math.floor(Math.random() * 10) + 1
      ),
    },
  ]);

  const router = useRouter();

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

  const notify = () =>
    toast.success("Stock added to portfolio.", {
      position: "top-right",
    });

  const RangeSelector = ({ range }: { range: string }) => {
    return (
      <span
        className={classNames(
          "h-8 w-8 flex items-center justify-center border rounded-full text-xs",
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
    <div className="w-full h-full">
      <div className="w-full h-full max-w-4xl lg:py-10 lg:mx-auto">
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
                <h2 className="text-lg font-semibold">AAPL</h2>
                <span className="text-xs font-normal">Apple Inc</span>
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-full px-5 py-2.5">
              <div className="flex flex-col justify-center items-start w-full h-full">
                <h2 className="text-2xl font-semibold">$ {"190.69"}</h2>
                <span
                  className={classNames("text-xs font-normal text-green-500")}
                >
                  {"+"} ${"1.25"}({"2.07%"})
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
              <PriceDetails title="close price" price={"15,690.34"} />
              <PriceDetails title="last trade price" price={"15,701.56"} />
              <PriceDetails title="outstanding" price={"1,234,567,890.12"} />
              <PriceDetails
                title="market value"
                price={"567,890,123,456.00"}
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
    </div>
  );
};

export default StockDetail;
