import urlFor from "@/app/utils/urlFor";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";

export const dynamic = "force-dynamic";

const contactImageQuery = groq`
  *[_type == "contact"][0]{
    image,
  }
`;

export default async function ContactImage() {
  const revalidate = 60;
  const contactImageData: Contact = await client.fetch(contactImageQuery, {
    next: revalidate,
  });

  return (
    <>
      {contactImageData?.image && (
        <Image
          alt={contactImageData?.image.alt ? contactImageData?.image?.alt : ""}
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
