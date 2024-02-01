import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Gallery from "../components/Gallery";
import { timeout } from "@/app/utils/helpers";

export const dynamic = "force-dynamic";

const productsDataQuery = groq`
  *[_type == "product" && customOrder == false] | order(sold asc)
`;

export default async function ProductsGallery() {
  const revalidate = 60;
  const productData = (await client.fetch(productsDataQuery, {
    next: revalidate,
  })) as Product[];
  return <>{productData && <Gallery data={productData} columns={3} />}</>;
}
