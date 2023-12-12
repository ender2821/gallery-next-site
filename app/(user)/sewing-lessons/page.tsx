import styles from "./sewingLessons.module.scss";
import { Noto_Serif_Display } from "next/font/google";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Divider from "../components/Divider";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";

import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import urlFor from "@/app/utils/urlFor";
import Image from "next/image";
import Schedule from "../components/Schedule";

export const dynamic = "force-dynamic";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

const sewingQuery = groq`
  *[_type == "sewing"][0]{
    name,
    pageContent,
    image
  }
`;

export default async function Alterations() {
  const revalidate = 60;
  const sewingData: Sewing = await client.fetch(sewingQuery, {
    next: revalidate,
  });

  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <DryCleaningIcon />
          </div>
          {sewingData?.name && (
            <h1 className={notoSerifDisplay.className}>{sewingData?.name}</h1>
          )}
          <div className={styles.contentBody}>
            {sewingData?.pageContent && (
              <PortableText value={sewingData?.pageContent} />
            )}
          </div>
          <Divider />
          <Schedule
            schedule={
              process.env.CALENDLY_SEWING ? process.env.CALENDLY_SEWING : ""
            }
          />
        </div>
        <div className={styles.imageContain}>
          {sewingData?.image && (
            <Image
              alt={sewingData?.image.alt ? sewingData?.image?.alt : ""}
              src={urlFor(sewingData?.image?.asset).url()}
              sizes="40vw"
              style={{
                objectFit: "cover",
              }}
              fill
            />
          )}
        </div>
      </section>
    </>
  );
}
