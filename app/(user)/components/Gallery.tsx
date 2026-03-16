import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import styles from "./gallery.module.scss";
import Image from "next/image";
import urlFor from "../../utils/urlFor";
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
          {data.map(
            (item, i) =>
              item?.image?.asset && (
                <Link
                  href={`/products/${item?.slug?.current}`}
                  key={item?.image?.asset._ref || i}
                  className={styles.link}
                >
                  <ImageListItem>
                    <img
                      src={`${urlFor(
                        item?.image?.asset,
                      ).url()}?w=400&fit=crop&auto=format`}
                      alt={item?.image?.alt || "Product"}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      position="bottom"
                      subtitle={item?.sold ? "Sold" : `$${item?.cost}`}
                      title={item?.name}
                      sx={{
                        "& .MuiImageListItemBar-subtitle": {
                          fontSize: "clamp(2.2rem, 2vw, 3.4rem)",
                        },
                        "& .MuiImageListItemBar-title": {
                          fontSize: "1.6rem",
                        },
                      }}
                    />
                  </ImageListItem>
                </Link>
              ),
          )}
        </ImageList>
      )}
    </div>
  );
}
