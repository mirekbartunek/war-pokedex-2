import { Res } from "../../types/response";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../components/be/Fetcher";

export const Pokemon = () => {
  const router = useRouter();
  const { name } = router.query;
  const { data, error, isLoading } = useSWR<Res>(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    fetcher
  );
  if (isLoading) return <h1 className="m-auto text-9xl">Zerru deti...</h1>;
  if (error)
    return <h1 className="m-auto text-9xl">Zatkli me behem zrrani deti...</h1>;
  return (
    <main className="p-5 flex flex-col items-center justify-center">
      <section>
        <h1 className="text-xl underline">
          {data?.pokeName?.charAt(0)?.toUpperCase() + data?.pokeName?.slice(1)!}
        </h1>
      </section>
    </main>
  );
};
