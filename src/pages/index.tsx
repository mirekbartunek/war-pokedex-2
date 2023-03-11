import useSWR from "swr";
import { fetcher } from "@/components/be/Fetcher";
import { PartialRes, Result } from "@/types/partialRes";
import { Card } from "@/components/fe/Card/Card";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";

const MAX_API_PAGE = 1281;
const MIN_API_PAGE = 0;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [pagination, setPagination] = useState<number>(20);
  const [filtered, setFiltered] = useState<Result[]>([]);
  const { data, isLoading } = useSWR<PartialRes>(
    `https://pokeapi.co/api/v2/pokemon?limit=${pagination}&offset=0`,
    fetcher
  );

  useEffect(() => {
    if (isLoading) return;
    const updateData: Result[] = searchTerm
      ? data?.results.filter((item) => item.name.includes(searchTerm!))!
      : data!.results;
    setFiltered(updateData);
  }, [searchTerm, data, isLoading]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-9xl">Loading...</h1>
      </div>
    );
  return (
    <>
      <header className="flex items-center justify-between p-1 mb-5">
        <h1 className="text-xl italic underline">Pokédex</h1>
        <input
          type="text"
          name="filter"
          id="pokefilter"
          placeholder="Type to filter..."
          className="p-2 border-2 border-black rounded-xl"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </header>
      <section className="flex items-center justify-center">
        <article className="flex flex-row flex-wrap gap-10">
          {filtered.map((item) => (
            <Card {...item} key={item.name} />
          ))}
        </article>
      </section>
      <div className="flex flex-row gap-5 items-center justify-center">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            if (pagination - 20 < MIN_API_PAGE) {
              alert("Minimal page reached");
              return;
            }
            setPagination(pagination - 20);
          }}
        />
        <ArrowRight
          className="cursor-pointer"
          onClick={() => {
            if (pagination + 20 > MAX_API_PAGE) {
              alert("Maximal page reached");
              return;
            }
            setPagination(pagination + 20);
          }}
        />
      </div>
    </>
  );
}
