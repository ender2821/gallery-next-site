import { client } from "@/sanity/lib/client";
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
  const revalidate = 60;
  const data = (await client.fetch(homeProductsQuery, {
    next: revalidate,
  })) as Home;

  const updatedProductData = data?.productList.map((item) => item?.product);
  return (
    <>
      {data?.productList && <Gallery data={updatedProductData} columns={2} />}
    </>
  );
}
