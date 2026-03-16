import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import GarmentGallery from "../components/GarmentsGallery";

export const dynamic = "force-dynamic";

const customGarmentsGalleryQuery = groq`
  *[_type == "customGarments"][0]{
    garmentImages
  }
`;

export default async function CustomGarmentsGallery() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const { data: customGarmentsData } = await sanityFetch({
    query: customGarmentsGalleryQuery,
    params: {},
  });

  return (
    <>
      {customGarmentsData && (
        <GarmentGallery
          data={customGarmentsData?.garmentImages ?? []}
          columns={3}
        />
      )}
    </>
  );
}
