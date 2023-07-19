import { MdInsights } from "react-icons/md";
import { TbScript, TbReportSearch } from "react-icons/tb";

export const formatUSD = (number: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(number);
};

export const categoriesLine = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const notifications = [
  {
    name: "Insights",
    description: "Measure actions your have taken",
    icon: MdInsights,
    href: "/",
  },
  {
    name: "Automation",
    description: "Create your own targeted script",
    icon: TbScript,
    href: "/",
  },
  {
    name: "Reports",
    description: "Keep track of your growth",
    icon: TbReportSearch,
    href: "/",
  },
];
