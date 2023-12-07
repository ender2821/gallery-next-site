import styles from "./customGarments.module.scss";
import { Noto_Serif_Display } from "next/font/google";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Divider from "../components/Divider";
import { PortableText } from "@portabletext/react";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import GarmentGallery from "../components/GarmentsGallery";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

const customGarmentsQuery = groq`
  *[_type == "customGarments"][0]{
    name,
    pageContent,
    garmentImages
  }
`;

export default async function CustomGarments() {
  const revalidate = 60;
  const customGarmentsData: CustomGarments = await client.fetch(
    customGarmentsQuery,
    {
      next: revalidate,
    }
  );

  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <ContentCutIcon />
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
        </div>
        <div>
          {" "}
          {customGarmentsData && (
            <GarmentGallery
              data={customGarmentsData?.garmentImages}
              columns={3}
            />
          )}
        </div>
      </section>
    </>
  );
}
