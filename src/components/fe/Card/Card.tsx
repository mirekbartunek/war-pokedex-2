import { Result } from "@/types/partialRes";
import { useFetchImage } from "@/components/be/FetchImage";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { capitalizer } from "@/components/be/capitalizer";
export const Card = ({ name, url }: Result) => {
  const { isLoading, data } = useFetchImage(url); //pass pagination to home component
  console.log(name, isLoading);
  return (
    <Link href={`/pokemon/${name}`}>
      <div className="flex flex-col items-center justify-center p-2 border-2 border-black w-36 rounded-xl hover:scale-105">
        {isLoading && !data && <Skeleton count={2} />}
        {data && (
          <Image
            src={data.sprites.front_default}
            width={200}
            height={200}
            alt={name}
          />
        )}
        <p className="border-t-2 border-t-black">
          {data && capitalizer(data?.name)}
        </p>
      </div>
    </Link>
  );
};
