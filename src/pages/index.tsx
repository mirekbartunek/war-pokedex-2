import useSWR from "swr";
import { fetcher } from "@/components/be/Fetcher";
import { PartialRes } from "@/types/partialRes";
import { Card } from "@/components/fe/Card/Card";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>();
  const { data, error, isLoading } = useSWR<PartialRes>(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
    fetcher
  );

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
      <main className="flex items-center justify-center">
        {/* play around with filtering over the results map, if searchTerm is undefined, then skip and map over the filtered array */}
        <article className="flex flex-row flex-wrap gap-2 align-center">
          {searchTerm === undefined
            ? data?.results.map((result) => (
                <Card {...result} key={result.name} />
              ))
            : data?.results
                .filter((item) => item.name.includes(searchTerm))
                .map((item) => (
                  <Card {...item} key={`Filtered ${item.name}`} />
                ))}
        </article>
      </main>
    </>
  );
}
