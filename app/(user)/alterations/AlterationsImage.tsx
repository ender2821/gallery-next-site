import urlFor from "@/app/utils/urlFor";
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import Image from "next/image";

const alterationsImageQuery = groq`
  *[_type == "alterations"][0]{
    image
  }
`;

export default async function AlterationsImage() {
  const { data: alterationsImageData } = await sanityFetch({
    query: alterationsImageQuery,
    params: {},
  });

  return (
    <>
      {alterationsImageData?.image?.asset && (
        <Image
          alt={alterationsImageData?.image?.alt || ""}
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
