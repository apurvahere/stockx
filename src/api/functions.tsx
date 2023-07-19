import { REQ } from "@/utils/constants";
import { callGet } from "./calls";

export const listAllMainMarket = async (token?: string) => {
  return callGet(REQ.MAIN_MARKET_LIST, token);
};

export const listAllJuniorMarket = async (token?: string) => {
  return callGet(REQ.JUNIOR_MARKET_LIST, token);
};
