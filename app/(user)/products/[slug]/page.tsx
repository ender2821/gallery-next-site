import Image from "next/image";
import styles from "./product.module.scss";
import { Noto_Serif_Display } from "next/font/google";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Gallery from "../../components/Gallery";
import Divider from "../../components/Divider";
import urlFor from "../../lib/urlFor";
import { PortableText } from "@portabletext/react";
import CollectionsIcon from "@mui/icons-material/Collections";
import Button from "../../components/Button";
import ProductImageList from "../../components/ProductImageList";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

type Props = {
  params: {
    slug: string;
  };
};

const productQuery = groq`
  *[_type == "product" && slug.current == $slug][0]
`;

export default async function Product({ params: { slug } }: Props) {
  const revalidate = 60;
  const productData: Product = await client.fetch(productQuery, {
    slug,
    next: revalidate,
  });

  return (
    <>
      <section className={styles.showcase}>
        <div className={styles.showcaseContent}>
          <div className={styles.icon}>
            <CollectionsIcon />
          </div>
          {productData?.name && (
            <h1 className={notoSerifDisplay.className}>{productData?.name}</h1>
          )}
          {productData?.productDescription && (
            <PortableText value={productData?.productDescription} />
          )}
          {productData && (
            <p className={notoSerifDisplay.className}>
              {productData.sold ? "Sold" : `$${productData.cost}`}
            </p>
          )}
        </div>
        <div>
          <ProductImageList data={productData} />
        </div>
      </section>
    </>
  );
}
