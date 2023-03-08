import { PartialRes, Result } from "../../types/partialRes";
import useSWR from "swr";
import { fetcher } from "./Fetcher";
import { Res } from "@/types/response";

export const FetchImage = ({ url }: Partial<Result>) => {
  const { data, error, isLoading } = useSWR<Res>(url, fetcher);
  return data?.sprites.front_default;
};
