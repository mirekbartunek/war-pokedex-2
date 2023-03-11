import { Result } from "@/types/partialRes";
import { useFetchImage } from "@/components/be/FetchImage";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// TODO: apply styles to skeleton
// TODO: fix pagination
// TODO: fix the styles
export const Card = ({ name, url }: Result) => {
  const { isLoading, data } = useFetchImage(url); //pass pagination to home component
  const capitalizedName = name.charAt(0)?.toUpperCase() + name.slice(1);
  console.log(name, isLoading);
  return (
    <Link href={`/pokemon/${name}`}>
      <div className="flex flex-col items-center justify-center p-2 border-2 border-black w-36 rounded-xl hover:scale-105">
        {isLoading && <Skeleton count={2} />}
        {data && (
          <Image
            src={data.sprites.front_default}
            width={200}
            height={200}
            alt={name}
          />
        )}
        <p className="border-t-2 border-t-black">{capitalizedName}</p>
      </div>
    </Link>
  );
};
