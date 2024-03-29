import styles from "./alterations.module.scss";
import { Noto_Serif_Display } from "next/font/google";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Divider from "../components/Divider";
import { PortableText } from "@portabletext/react";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import Schedule from "../components/Schedule";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import AlterationsImage from "./AlterationsImage";

export const dynamic = "force-dynamic";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

const alterationsQuery = groq`
  *[_type == "alterations"][0]{
    name,
    pageContent,
  }
`;

export default async function Alterations() {
  const revalidate = 60;
  const alterationsData: Alterations = await client.fetch(alterationsQuery, {
    next: revalidate,
  });

  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <ContentCutIcon />
          </div>
          {alterationsData?.name && (
            <h1 className={notoSerifDisplay.className}>
              {alterationsData?.name}
            </h1>
          )}
          <div className={styles.contentBody}>
            {alterationsData?.pageContent && (
              <PortableText value={alterationsData?.pageContent} />
            )}
          </div>
          <Divider />
          <Schedule
            schedule={
              process.env.CALENDLY_ALTERATIONS
                ? process.env.CALENDLY_ALTERATIONS
                : ""
            }
          />
        </div>
        <div className={styles.imageContain}>
          <Suspense fallback={<LoadingSpinner />}>
            <AlterationsImage />
          </Suspense>
        </div>
      </section>
    </>
  );
}
