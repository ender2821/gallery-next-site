import styles from "./customGarments.module.scss";
import { Noto_Serif_Display } from "next/font/google";
import { groq } from "next-sanity";
import Divider from "../components/Divider";
import { PortableText } from "@portabletext/react";
import CollectionsIcon from "@mui/icons-material/Collections";
import CustomGarmentForm from "../components/CustomGarmentForm";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import CustomGarmentsGallery from "./CustomGarmentsGallery";
import { sanityFetch } from "@/sanity/lib/live";

export const dynamic = "force-dynamic";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

const customGarmentsQuery = groq`
  *[_type == "customGarments"][0]{
    name,
    pageContent,
  }
`;

export default async function CustomGarments() {
  const { data: customGarmentsData } = await sanityFetch({
    query: customGarmentsQuery,
    params: {},
  });

  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <CollectionsIcon />
          </div>
          {customGarmentsData?.name && (
            <h1 className={notoSerifDisplay.className}>
              {customGarmentsData?.name}
            </h1>
          )}
          <div className={styles.contentBody}>
            {customGarmentsData?.pageContent && (
              <PortableText value={customGarmentsData?.pageContent} />
            )}
          </div>
          <Divider />
          <CustomGarmentForm />
        </div>
        <div className={styles.garmentsGalleryContain}>
          <Suspense fallback={<LoadingSpinner />}>
            <CustomGarmentsGallery />
          </Suspense>
        </div>
      </section>
    </>
  );
}
