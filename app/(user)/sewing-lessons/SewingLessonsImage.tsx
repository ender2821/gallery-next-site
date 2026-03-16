import urlFor from "@/app/utils/urlFor";
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import Image from "next/image";

export const dynamic = "force-dynamic";

const sewingQuery = groq`
  *[_type == "sewing"][0]{
    image
  }
`;

export default async function SewingLessonsImage() {
  const { data: sewingImageData } = await sanityFetch({ query: sewingQuery, params: {} });

  return (
    <>
      {sewingImageData?.image?.asset && (
        <Image
          alt={sewingImageData?.image?.alt || ""}
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
