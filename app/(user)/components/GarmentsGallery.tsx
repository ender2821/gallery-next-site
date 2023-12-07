import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import styles from "./gallery.module.scss";
import Image from "next/image";
import urlFor from "../../utils/urlFor";
import Link from "next/link";

type GarmentGallery = {
  data: Image[];
  columns: number;
};

export default function GarmentGallery(props: GarmentGallery) {
  const { data, columns } = props;

  return (
    <div className={styles.gallery}>
      {data.length > 0 && (
        <ImageList variant="masonry" cols={columns} gap={8}>
          {data.map((item, i) => (
            <ImageListItem key={i}>
              <img
                src={`${urlFor(item?.asset).url()}?w=400&fit=crop&auto=format`}
                alt={item?.alt}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
}
