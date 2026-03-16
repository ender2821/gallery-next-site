import urlFor from "@/app/utils/urlFor";
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import Image from "next/image";

export const dynamic = "force-dynamic";

const contactImageQuery = groq`
  *[_type == "contact"][0]{
    image,
  }
`;

export default async function ContactImage() {
  const { data: contactImageData } = await sanityFetch({ query: contactImageQuery, params: {} });

  return (
    <>
      {contactImageData?.image?.asset && (
        <Image
          alt={contactImageData?.image?.alt || ""}
          src={urlFor(contactImageData?.image?.asset).url()}
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
