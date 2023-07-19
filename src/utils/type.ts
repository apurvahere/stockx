import { IconType } from "react-icons/lib";

export interface TabInterface {
  title: string;
  icon?: JSX.Element;
  url?: string;
  type?: number;
}

export type MainMarketProps = {
  stockName: string;
  stockSymbol: string;
  stockGraph: [];
  currentPrice: string;
  returnsPercent: string;
  returnsAmount: string;
  closingPrice: string;
  lastTradePrice: string;
  outStanding: string;
  currentMarketPrice: string;
  id: string;
};

export type ChartDataProps = {
  data: number[];
}[];

export type NotificationsProps = {
  name: string;
  description: string;
  icon: IconType;
  href: string;
};

export type PriceDetailsProps = {
  title: string;
  price: string;
  hasSymbol?: boolean;
};
