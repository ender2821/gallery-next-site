import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import styles from "./gallery.module.scss";
import Image from "next/image";
import urlFor from "../lib/urlFor";
import Link from "next/link";

type Gallery = {
  data: Product[];
  columns: number;
};

export default function Gallery(props: Gallery) {
  const { data, columns } = props;

  return (
    <div className={styles.gallery}>
      {data.length > 0 && (
        <ImageList variant="masonry" cols={columns} gap={8}>
          {data.map((item, i) => (
            <Link
              href={`/products/${item?.slug?.current}`}
              key={item?.name + i}
              className={styles.link}
            >
              <ImageListItem>
                <img
                  src={`${urlFor(
                    item?.image?.asset
                  ).url()}?w=400&fit=crop&auto=format`}
                  alt={item?.image?.alt}
                  loading="lazy"
                />
                <ImageListItemBar
                  position="bottom"
                  subtitle={item?.sold ? "Sold" : `$${item?.cost}`}
                  title={item?.name}
                />
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      )}
    </div>
  );
}
