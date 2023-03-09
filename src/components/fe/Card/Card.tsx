import { PartialRes, Result } from "@/types/partialRes";
import { FetchImage } from "@/components/be/FetchImage";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export const Card = ({ name, url }: Result) => {
  const image = FetchImage(url);
  const capitalizedName = name.charAt(0)?.toUpperCase() + name.slice(1);

  return (
    <Link href={`/pokemon/${name}`}>
      <div className="flex flex-col items-center justify-center p-2 border-2 border-black w-36 rounded-xl hover:scale-105">
        {image && <Image src={image} width={200} height={200} alt={name} />}
        {!image && <p>Trying to retrieve image..</p>}
        <p className="border-t-2 border-t-black">{capitalizedName}</p>
      </div>
    </Link>
  );
};
