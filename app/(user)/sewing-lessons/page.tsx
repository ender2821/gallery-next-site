import styles from "./sewingLessons.module.scss";
import { Noto_Serif_Display } from "next/font/google";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Divider from "../components/Divider";
import { PortableText } from "@portabletext/react";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import Schedule from "../components/Schedule";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SewingLessonsImage from "./SewingLessonsImage";

export const dynamic = "force-dynamic";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

const sewingQuery = groq`
  *[_type == "sewing"][0]{
    name,
    pageContent,
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
          <Suspense fallback={<LoadingSpinner />}>
            <SewingLessonsImage />
          </Suspense>
        </div>
      </section>
    </>
  );
}
