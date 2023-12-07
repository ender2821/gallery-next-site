import Image from "next/image";
import styles from "./home.module.scss";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { Noto_Serif_Display } from "next/font/google";
import urlFor from "../utils/urlFor";
import Button from "./components/Button";
import PatchIllustration from "../assets/patchIllustration.svg";
import Gallery from "./components/Gallery";
import CollectionsIcon from "@mui/icons-material/Collections";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import Divider from "./components/Divider";

const notoSerif = Noto_Serif_Display({ subsets: ["latin"] });

const homeQuery = groq`
  *[_type == "home"][0]{
    homeAlterationsTitle,
    homeLessonsBackground,
    homeLessonsTitle,
    homeGalleryTitle,
    heroBackground,
    homeAlterationsText,
    heroImage,
    homeLessonsButtonTitle,
    heroCta,
    homeGalleryText,
    homeLessonsText,
    homeGalleryButtonTitle,
    homeAlterationsBackground,
    homeAlterationsButtonTitle,
    heroText,
    productList[] {
      product->{
        sold,
        cost,
        image,
        name,
        slug,
      }
    },
  }
`;

export default async function Home() {
  const revalidate = 60;
  const data = (await client.fetch(homeQuery, {
    next: revalidate,
  })) as Home;

  const updatedData = data?.productList.map((item) => item.product);

  data.productList = updatedData;

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroImages}>
          <div className={styles.heroImageContain}>
            {data?.heroImage && (
              <Image
                alt={data?.heroImage?.alt}
                src={urlFor(data?.heroImage?.asset).url()}
                sizes="(min-width: 400px) 50vw 100vw"
                style={{
                  objectFit: "cover",
                }}
                fill
              />
            )}
          </div>
          <div className={styles.heroBackgroundContain}>
            {data?.heroBackground && (
              <Image
                alt="Hero Background"
                src={urlFor(data?.heroBackground?.asset).url()}
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  opacity: "0.1",
                }}
                fill
              />
            )}
          </div>
        </div>
        <div className={styles.heroContent}>
          {data && <h1 className={notoSerif.className}>{data.heroText}</h1>}
          <div>
            <Button
              text={data?.heroCta ? data?.heroCta : "CTA Text"}
              link={"/custom-garments"}
            />
          </div>
          <div className={styles.patchIllustration}>
            <PatchIllustration />
          </div>
        </div>
      </section>
      <Divider />
      <section className={styles.gallery}>
        <div className={styles.galleryContent}>
          <span className={styles.icon}>
            <CollectionsIcon />
          </span>
          <h2 className={notoSerif.className}>
            {data?.homeGalleryTitle && data?.homeGalleryTitle}
          </h2>
          <p>{data?.homeGalleryText && data?.homeGalleryText}</p>
          <Button
            text={
              data?.homeGalleryButtonTitle
                ? data?.homeGalleryButtonTitle
                : "Button Text"
            }
            link={"/products"}
          />
        </div>
        <div className={styles.galleryItems}>
          {data?.productList && (
            <Gallery data={data?.productList} columns={2} />
          )}
        </div>
      </section>
      <Divider />
      <section className={styles.serviceCards}>
        <div className={styles.card}>
          <div className={styles.cardBackgroundContain}>
            {data?.homeAlterationsBackground && (
              <Image
                alt={data?.homeAlterationsTitle && data?.homeAlterationsTitle}
                src={urlFor(data?.homeAlterationsBackground?.asset).url()}
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  opacity: "0.1",
                }}
                fill
              />
            )}
          </div>
          <div className={styles.cardContent}>
            <span className={styles.icon}>
              <ContentCutIcon />
            </span>
            <h2 className={notoSerif.className}>
              {data?.homeAlterationsTitle && data?.homeAlterationsTitle}
            </h2>
            <p>{data?.homeAlterationsText && data?.homeAlterationsText}</p>
            <Button
              text={
                data?.homeAlterationsButtonTitle
                  ? data?.homeAlterationsButtonTitle
                  : "Button Text"
              }
              link={"/alterations"}
            />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBackgroundContain}>
            {data?.homeLessonsBackground && (
              <Image
                alt={data?.homeLessonsTitle && data?.homeLessonsTitle}
                src={urlFor(data?.homeLessonsBackground?.asset).url()}
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  opacity: "0.1",
                }}
                fill
              />
            )}
          </div>
          <div className={styles.cardContent}>
            <span className={styles.icon}>
              <DryCleaningIcon />
            </span>
            <h2 className={notoSerif.className}>
              {data?.homeLessonsTitle && data?.homeLessonsTitle}
            </h2>
            <p>{data?.homeLessonsText && data?.homeLessonsText}</p>
            <Button
              text={
                data?.homeLessonsButtonTitle
                  ? data?.homeLessonsButtonTitle
                  : "Button Text"
              }
              link={"/sewing-lessons"}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
