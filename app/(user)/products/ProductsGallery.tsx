import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import Gallery from "../components/Gallery";

export const dynamic = "force-dynamic";

const productsDataQuery = groq`
  *[_type == "product" && customOrder == false] | order(sold asc)
`;

export default async function ProductsGallery() {
  const { data: productData } = await sanityFetch({ query: productsDataQuery, params: {} });
  return <>{productData && <Gallery data={productData} columns={3} />}</>;
}
