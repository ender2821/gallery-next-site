import urlFor from "@/app/utils/urlFor";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";

export const dynamic = "force-dynamic";

const sewingQuery = groq`
  *[_type == "sewing"][0]{
    image
  }
`;

export default async function SewingLessonsImage() {
  const revalidate = 60;
  const sewingImageData: Sewing = await client.fetch(sewingQuery, {
    next: revalidate,
  });

  return (
    <>
      {sewingImageData?.image && (
        <Image
          alt={sewingImageData?.image.alt ? sewingImageData?.image?.alt : ""}
          src={urlFor(sewingImageData?.image?.asset).url()}
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
