import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import styles from "./gallery.module.scss";
import Image from "next/image";
import urlFor from "../lib/urlFor";
import Link from "next/link";

type Gallery = {
  data: Product[];
};

export default function Gallery(props: Gallery) {
  const { data } = props;

  return (
    <div className={styles.gallery}>
      {data.length > 0 && (
        <ImageList variant="masonry" cols={2} gap={8}>
          {data.map((item, i) => (
            <Link
              href={`/products/${item?.product?.slug?.current}`}
              key={item?.product?.name + i}
              className={styles.link}
            >
              <ImageListItem>
                <img
                  src={`${urlFor(
                    item?.product?.image?.asset
                  ).url()}?w=248&fit=crop&auto=format`}
                  alt={item?.product?.image?.alt}
                  loading="lazy"
                />
                <ImageListItemBar
                  position="bottom"
                  subtitle={`$${item?.product?.cost}`}
                  title={item?.product?.name}
                />
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      )}
    </div>
  );
}
