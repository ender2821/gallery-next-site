import Image from "next/image";
import styles from "./home.module.scss";
import { groq } from "next-sanity";
import { sanityFetch } from '@/sanity/lib/live'
import { Noto_Serif_Display } from "next/font/google";
import urlFor from "../utils/urlFor";
import Button from "./components/Button";
import PatchIllustration from "../assets/patchIllustration.svg";
import CollectionsIcon from "@mui/icons-material/Collections";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import Divider from "./components/Divider";
import HomeProducts from "./HomeProducts";
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

export const dynamic = "force-dynamic";

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
  }
`;
// TODO: fix the way the fonts are being inserted

export default async function Home() {
  const { data } = await sanityFetch({
    query: homeQuery,
    params: {},
  });
  const dataTyped = data as Home;

    return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroImages}>
          <div className={styles.heroImageContain}>
            {dataTyped?.heroImage?.asset && (
              <Image
                alt={dataTyped?.heroImage?.alt || "Hero Image"}
                src={urlFor(dataTyped?.heroImage?.asset).url()}
                sizes="(min-width: 400px) 50vw 100vw"
                style={{
                  objectFit: "cover",
                }}
                fill
              />
            )}
          </div>
          <div className={styles.heroBackgroundContain}>
            {dataTyped?.heroBackground?.asset && (
              <Image
                alt="Hero Background"
                src={urlFor(dataTyped?.heroBackground?.asset).url()}
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
          {dataTyped && <h1 className={notoSerif.className}>{dataTyped.heroText}</h1>}
          <div>
            <Button
              text={dataTyped?.heroCta ? dataTyped?.heroCta : "CTA Text"}
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
            {dataTyped?.homeGalleryTitle && dataTyped?.homeGalleryTitle}
          </h2>
          <p>{dataTyped?.homeGalleryText && dataTyped?.homeGalleryText}</p>
          <Button
            text={
              dataTyped?.homeGalleryButtonTitle
                ? dataTyped?.homeGalleryButtonTitle
                : "Button Text"
            }
            link={"/products"}
          />
        </div>
        <div className={styles.galleryItems}>
          <Suspense fallback={<LoadingSpinner />}>
            <HomeProducts />
          </Suspense>
        </div>
      </section>
      <Divider />
      <section className={styles.serviceCards}>
        <div className={styles.card}>
          <div className={styles.cardBackgroundContain}>
            {dataTyped?.homeAlterationsBackground?.asset && (
              <Image
                alt={dataTyped?.homeAlterationsTitle || "Alterations"}
                src={urlFor(dataTyped?.homeAlterationsBackground?.asset).url()}
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
              {dataTyped?.homeAlterationsTitle && dataTyped?.homeAlterationsTitle}
            </h2>
            <p>{dataTyped?.homeAlterationsText && dataTyped?.homeAlterationsText}</p>
            <Button
              text={
                dataTyped?.homeAlterationsButtonTitle
                  ? dataTyped?.homeAlterationsButtonTitle
                  : "Button Text"
              }
              link={"/alterations"}
            />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBackgroundContain}>
            {dataTyped?.homeLessonsBackground?.asset && (
              <Image
                alt={dataTyped?.homeLessonsTitle || "Sewing Lessons"}
                src={urlFor(dataTyped?.homeLessonsBackground?.asset).url()}
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
              {dataTyped?.homeLessonsTitle && dataTyped?.homeLessonsTitle}
            </h2>
            <p>{dataTyped?.homeLessonsText && dataTyped?.homeLessonsText}</p>
            <Button
              text={
                dataTyped?.homeLessonsButtonTitle
                  ? dataTyped?.homeLessonsButtonTitle
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
