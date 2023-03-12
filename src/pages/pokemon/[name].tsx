import { PokemonDetail } from "@/types/response";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/components/be/Fetcher";
import { ArrowLeft } from "tabler-icons-react";
import Image from "next/image";
import ProgressBar from "@ramonak/react-progress-bar";
import { FastAverageColor } from "fast-average-color";
import { useState } from "react";
import { capitalizer } from "@/components/be/capitalizer";
import { typeColourPair } from "@/consts/typePair";

export default function Pokemon() {
  const router = useRouter();
  const [averageColor, setAverageColor] = useState<string>();
  const { name } = router.query;
  const { data, error, isLoading } = useSWR<PokemonDetail>(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    fetcher
  );
  if (data !== undefined) {
    const fac = new FastAverageColor();
    fac
      .getColorAsync(data?.sprites.front_default, {
        ignoredColor: [255, 255, 255, 255],
        mode: "speed",
      })
      .then((color) => setAverageColor(color.hex));
  }

  if (isLoading) return <h1 className="text-center text-9xl">Loading...</h1>;
  if (error) return <h1 className="text-center text-9xl">An error occurred</h1>;
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <header>
          <h1
            className="text-3xl underline hover:italic align-center underline-offset-1 cursor-pointer"
            onClick={() =>
              navigator.clipboard.writeText(
                "https://war-pokedex-2.vercel.app" + router.asPath
              )
            }
          >
            {data?.name && capitalizer(data.name)}
          </h1>
        </header>
        <section className="flex flex-row">
          {data?.sprites.front_default && (
            <Image
              src={data?.sprites.front_default}
              alt={`${data?.name} image`}
              width={200}
              height={200}
            />
          )}

          {data?.sprites.back_default && (
            <Image
              src={data.sprites.back_default}
              alt={`${data.name} back image`}
              width={200}
              height={200}
            />
          )}
        </section>
        <section>
          <h3 className="text-2xl text-center">Stats</h3>
          <ul className="flex flex-col">
            {data?.stats.map((stat) => (
              <li key={stat.stat.name}>
                {capitalizer(stat.stat.name)}
                :
                <ProgressBar
                  animateOnRender
                  completed={`${stat.base_stat}`}
                  bgColor={averageColor}
                  labelAlignment="center"
                />
              </li>
            ))}
          </ul>
          <article className="flex-col mt-3 flex gap-1">
            {data?.types.map((item) => (
              <p
                key={item.type.name}
                className={`${
                  typeColourPair[item.type.name]
                } text-center rounded-lg p-2`}
              >
                {capitalizer(item.type.name)}
              </p>
            ))}
          </article>
        </section>
      </main>
      <ArrowLeft
        onClick={() => router.back()}
        className="cursor-pointer m-auto mt-10"
      />
    </>
  );
}
