import { Res } from "../../types/response";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../components/be/Fetcher";
import { ArrowLeft } from "tabler-icons-react";

export default function Pokemon() {
  const router = useRouter();
  const { name } = router.query;
  const { data, error, isLoading } = useSWR<Res>(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    fetcher
  );
  console.log(data);

  if (isLoading) return <h1 className="m-auto text-9xl">Zerru deti...</h1>;
  if (error)
    return <h1 className="m-auto text-9xl">Zatkli me behem zrrani deti...</h1>;
  return (
    <main className="flex items-center justify-center">
      <section>
        <h1 className="text-3xl underline align-center">
          {data?.name?.charAt(0)?.toUpperCase() + data?.name?.slice(1)!}
        </h1>
      </section>
      <article className="flex flex-col"></article>
      <ArrowLeft
        size={48}
        strokeWidth={2}
        color={"black"}
        className="bg-gray-100 rounded-full cursor-pointer"
        onClick={router.back}
      />
    </main>
  );
}
