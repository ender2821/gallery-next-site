"use client";

import { useState } from "react";
import styles from "./productImageList.module.scss";
import urlFor from "../../utils/urlFor";
import Image from "next/image";

type Props = {
  data: Product;
};

export default function ProductImageList(props: Props) {
  const { data } = props;

  const buildArr = (data: Product) => {
    let imageArr = [];
    data?.image && imageArr.push(data?.image);
    data?.productImages && imageArr.push(data?.productImages);

    return imageArr;
  };

  const imageData = buildArr(data).flat();
  const [mainImage, setMainImage] = useState({
    image: urlFor(imageData[0]?.asset).url(),
    alt: imageData[0]?.alt,
  });

  return (
    <div className={styles.container}>
      <div className={styles.mainImage}>
        <Image
          src={mainImage?.image}
          alt={mainImage?.alt ? mainImage?.alt : ""}
          sizes="(min-width: 50px) 650px"
          style={{
            objectFit: "cover",
          }}
          fill
        />
      </div>
      {imageData.length > 1 && (
        <div className={styles.productImageButtons}>
          {imageData.map((item, i) => {
            return (
              <button
                onClick={() =>
                  setMainImage({
                    image: urlFor(item?.asset).url(),
                    alt: item?.alt,
                  })
                }
                className={styles.imageButton}
                key={i}
              >
                <Image
                  src={urlFor(item?.asset).url()}
                  alt={item?.alt ? item?.alt : ""}
                  style={{
                    objectFit: "cover",
                  }}
                  sizes="(min-width: 50px) 125px"
                  fill
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
