import { Res } from "../../types/response";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../components/be/Fetcher";
import { ArrowLeft } from "tabler-icons-react";
import Image from "next/image";

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
    <>
      <main className="flex flex-col items-center justify-center">
        <header>
          <h1 className="text-3xl underline hover:italic align-center">
            {data?.name?.charAt(0)?.toUpperCase() + data?.name?.slice(1)!}
          </h1>
        </header>
        <main>
          <article className="flex flex-row justify-around">
            {data?.sprites.front_default && (
              <Image
                src={data?.sprites.front_default}
                alt={`${data?.name} image`}
                width={200}
                height={200}
              />
            )}
            <div></div>
          </article>
        </main>
      </main>
      <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
    </>
  );
}
