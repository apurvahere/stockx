"use client";

import { useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";

import { AiOutlineSearch } from "react-icons/ai";

import { InputField } from "@/components/form";
import {
  Navigation,
  JuniorMarket,
  MainMarket,
  Tabs,
  PrimaryTitle,
} from "../components/ui";
import { TabInterface } from "@/utils/type";
import { stocksTabType } from "@/utils/enums";

const Home: NextPageWithLayout = () => {
  const [tabs] = useState<TabInterface[]>([
    { title: "Main Market", type: stocksTabType.MainMarket },
    { title: "Junior Market", type: stocksTabType.JuniorMarket },
    { title: "FX Rates", type: stocksTabType.FxRates },
    { title: "Funds", type: stocksTabType.Funds },
  ]);
  const [tab, setTab] = useState<TabInterface>(tabs[0]);
  const [search, setSearch] = useState<string>("");

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setSearch(e.target.value);

  useEffect(() => {
    let getTabType = localStorage.getItem("currentTab");
    let tabType = getTabType && JSON.parse(getTabType);
    setTab(tabs[tabType]);
  }, [tab]);

  return (
    <div className="w-full h-full pb-10">
      <div className="w-full h-full sticky top-0 z-[999]">
        <Navigation />
        <div className="bg-blue-500 p-5 lg:p-10 flex flex-col lg:flex-row gap-5 justify-between items-start lg:items-center">
          <PrimaryTitle title="Markets" className="text-white" />
          <InputField
            id="searchStock"
            name="searchStock"
            prefixIcon={<AiOutlineSearch />}
            className="!bg-blue-300 !w-full focus:!ring-blue-100 focus:!outline-blue-300 !text-white placeholder:!text-white"
            prefixIconClassName="!text-white"
            placeHolder="Search Markets"
            size="sm"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="">
        <Tabs active={tab} handler={setTab} tabs={tabs} className="" />
        {
          {
            [stocksTabType.MainMarket]: <MainMarket search={search} />,
            [stocksTabType.JuniorMarket]: <JuniorMarket search={search} />,
            [stocksTabType.FxRates]: <MainMarket search={search} />,
            [stocksTabType.Funds]: <JuniorMarket search={search} />,
          }[tab?.type as number]
        }
      </div>
    </div>
  );
};

export default Home;
