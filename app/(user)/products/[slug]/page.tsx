import styles from "./product.module.scss";
import { Noto_Serif_Display } from "next/font/google";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Divider from "../../components/Divider";
import { PortableText } from "@portabletext/react";
import ProductImageList from "../../components/ProductImageList";
import BackButton from "../../components/BackButton";
import PurchaseForm from "../../components/PurchaseForm";
import CustomGarmentForm from "../../components/CustomGarmentForm";
import { Suspense } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

export const dynamic = "force-dynamic";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

type Props = {
  params: {
    slug: string;
  };
};

const productQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    sold,
    customOrder,
    name,
    slug,
    productDescription,
    cost,
    purchaseInstructions,
    orderInstructions,
  }
`;

const productImageQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    image,
    productImages
  }
`;

export default async function Product({ params: { slug } }: Props) {
  const revalidate = 60;
  const productData: Product = await client.fetch(productQuery, {
    slug,
    next: revalidate,
  });

  const productImageData: Product = await client.fetch(productImageQuery, {
    slug,
    next: revalidate,
  });

  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <BackButton />
          {productData?.name && (
            <h1 className={notoSerifDisplay.className}>{productData?.name}</h1>
          )}
          <div className={styles.contentBody}>
            {productData?.productDescription && (
              <PortableText value={productData?.productDescription} />
            )}
          </div>
          <div className={styles.cost}>
            {productData && (
              <p className={notoSerifDisplay.className}>
                {productData.sold ? "Sold" : `$${productData.cost}`}
              </p>
            )}
          </div>
          <Divider />
          {productData.sold ? (
            <>
              {productData?.orderInstructions && (
                <h3 className={styles.customOrderText}>
                  {productData?.orderInstructions}
                </h3>
              )}
              <CustomGarmentForm />
            </>
          ) : (
            <PurchaseForm data={productData} />
          )}
        </div>
        <div className={styles.productImageContain}>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductImageList data={productImageData} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
