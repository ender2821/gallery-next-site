import Image from "next/image";
import styles from "./page.module.scss";
import { Noto_Serif_Display } from "next/font/google";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Gallery from "../components/Gallery";
import Divider from "../components/Divider";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

const pageDataQuery = groq`
  *[_type == "products"][0]{
    productPageTitle,
    mainProduct,
    galleryTitle,
    galleryText
  }
`;

const productsDataQuery = groq`
  *[_type == "product" && customOrder == false] | order(sold asc)
`;

export default async function Products() {
  const revalidate = 60;
  const productData = await client.fetch(productsDataQuery, {
    next: revalidate,
  });

  const pageData = (await client.fetch(pageDataQuery, {
    next: revalidate,
  })) as Products;

  console.log(pageData);
  return (
    <>
      <section>
        {pageData?.productPageTitle && (
          <h1 className={notoSerifDisplay.className}>
            {pageData?.productPageTitle}
          </h1>
        )}
      </section>
      <Divider />
      <section className={styles.galleryItems}>
        {productData && <Gallery data={productData} columns={3} />}
        <div className={styles.galleryText}>
          {pageData?.galleryTitle && <h3>{pageData?.galleryTitle}</h3>}
          {pageData?.galleryText && <p>{pageData?.galleryText}</p>}
        </div>
      </section>
    </>
  );
}
