import Image from "next/image";
import styles from "./home.module.scss";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { Noto_Serif_Display } from "next/font/google";
import urlFor from "./lib/urlFor";
import Button from "./components/Button";
import PatchIllustration from "./assets/patchIllustration.svg";
import Gallery from "./components/Gallery";

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
    next: { revalidate },
  })) as Home;

  console.log(data?.productList[0].product.image, "data");
  console.log(data?.heroImage, "heroImage");

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
              link={"/"}
            />
          </div>
          <div className={styles.patchIllustration}>
            <PatchIllustration />
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.galleryContent}>
          <h2>{data?.homeGalleryTitle && data?.homeGalleryTitle}</h2>
          <p>{data?.homeGalleryText && data?.homeGalleryText}</p>
        </div>
        <div className={styles.galleryItems}>
          {data?.productList && <Gallery data={data?.productList} />}
        </div>
      </section>
    </main>
  );
}
