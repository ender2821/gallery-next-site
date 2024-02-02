import Image from "next/image";
import styles from "./products.module.scss";
import { Noto_Serif_Display } from "next/font/google";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Divider from "../components/Divider";
import urlFor from "../../utils/urlFor";
import { PortableText } from "@portabletext/react";
import CollectionsIcon from "@mui/icons-material/Collections";
import Button from "../components/Button";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductsGallery from "./ProductsGallery";

export const dynamic = "force-dynamic";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

const pageDataQuery = groq`
  *[_type == "products"][0]{
    productPageTitle,
    mainProduct->{
      sold,
      cost,
      image,
      name,
      slug,
      productDescription
    },
    galleryTitle,
    galleryText,
    mainProductButtonText,
  }
`;

export default async function Products() {
  const revalidate = 60;

  const pageData = (await client.fetch(pageDataQuery, {
    next: revalidate,
  })) as ProductsPage;

  return (
    <>
      <section className={styles.showcase}>
        <div className={styles.showcaseContent}>
          <div className={styles.icon}>
            <CollectionsIcon />
          </div>
          {pageData?.productPageTitle && (
            <h1 className={notoSerifDisplay.className}>
              {pageData?.productPageTitle}
            </h1>
          )}
          <div className={styles.contentContain}>
            {pageData?.mainProduct && (
              <p className={notoSerifDisplay.className}>
                {pageData?.mainProduct?.sold
                  ? "Sold"
                  : `$${pageData?.mainProduct?.cost}`}
              </p>
            )}
            <div className={styles.right}>
              {pageData?.mainProduct?.name && (
                <h3>{pageData?.mainProduct?.name}</h3>
              )}
              {pageData?.mainProduct?.productDescription && (
                <PortableText
                  value={pageData?.mainProduct?.productDescription[0]}
                />
              )}
              {pageData?.mainProduct && (
                <Button
                  text={
                    pageData?.mainProductButtonText
                      ? pageData?.mainProductButtonText
                      : "Button Text"
                  }
                  link={`/products/${pageData?.mainProduct?.slug?.current}`}
                />
              )}
            </div>
          </div>
        </div>
        {pageData?.mainProduct && (
          <div className={styles.showcaseImage}>
            <Image
              src={urlFor(pageData?.mainProduct?.image?.asset).url()}
              alt={pageData?.mainProduct?.name}
              sizes="(min-width: 400px) 50vw 100vw"
              style={{
                objectFit: "cover",
              }}
              fill
            />
          </div>
        )}
      </section>
      <Divider />
      <section className={styles.galleryItems}>
        <div className={styles.galleryItemsContain}>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductsGallery />
          </Suspense>
        </div>
        <div className={styles.galleryText}>
          {pageData?.galleryTitle && <h3>{pageData?.galleryTitle}</h3>}
          {pageData?.galleryText && <p>{pageData?.galleryText}</p>}
        </div>
      </section>
    </>
  );
}
