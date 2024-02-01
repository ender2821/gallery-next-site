import { client } from "@/sanity/lib/client";
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

  const revalidate = 60;
  const customGarmentsData: CustomGarments = await client.fetch(
    customGarmentsGalleryQuery,
    {
      next: revalidate,
    }
  );

  return (
    <>
      {customGarmentsData && (
        <GarmentGallery data={customGarmentsData?.garmentImages} columns={3} />
      )}
    </>
  );
}
