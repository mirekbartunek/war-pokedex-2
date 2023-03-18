import useSWR from "swr";
import { fetcher } from "@/components/be/Fetcher";
import { PokemonDetail } from "@/types/response";
// https://www.npmjs.com/package/react-loading-skeleton
export const useFetchImage = (url: string) => {
  const { data, isLoading } = useSWR<PokemonDetail>(url, fetcher);
  return {
    data,
    isLoading,
  };
};
