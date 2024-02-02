import urlFor from "@/app/utils/urlFor";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";

const alterationsImageQuery = groq`
  *[_type == "alterations"][0]{
    image
  }
`;

export default async function AlterationsImage() {
  const revalidate = 60;
  const alterationsImageData: Alterations = await client.fetch(
    alterationsImageQuery,
    {
      next: revalidate,
    }
  );

  return (
    <>
      {alterationsImageData?.image && (
        <Image
          alt={
            alterationsImageData?.image.alt
              ? alterationsImageData?.image?.alt
              : ""
          }
          src={urlFor(alterationsImageData?.image?.asset).url()}
          sizes="40vw"
          style={{
            objectFit: "cover",
          }}
          fill
        />
      )}
    </>
  );
}
