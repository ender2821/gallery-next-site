import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import Gallery from "./components/Gallery";

export const dynamic = "force-dynamic";

const homeProductsQuery = groq`
  *[_type == "home"][0]{
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

export default async function HomeProducts() {
  const { data } = await sanityFetch({ query: homeProductsQuery, params: {} });
  const dataTyped = data as Home;

  const updatedProductData = (dataTyped?.productList ?? [])
    .filter((item) => item?.product)
    .map((item) => item?.product) as Product[];
  return (
    <>
      {dataTyped?.productList && <Gallery data={updatedProductData} columns={2} />}
    </>
  );
}
