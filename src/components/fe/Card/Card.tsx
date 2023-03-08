import { PartialRes, Result } from "@/types/partialRes";
import { FetchImage } from "@/components/be/FetchImage";
import Image from "next/image";
import Link from "next/link";

export const Card = ({ name, url }: Result) => {
  const image = FetchImage({ url });
  return (
    <Link href={`/pokemon/${name}`}>
      <div className="flex flex-col items-center justify-center w-32 p-2 border-2 border-black rounded-xl">
        {image && <Image src={image} width={200} height={200} alt={name} />}
        {!image && <p>Picture not found</p>}
        <p>{name.charAt(0)?.toUpperCase() + name.slice(1)}</p>
      </div>
    </Link>
  );
};
