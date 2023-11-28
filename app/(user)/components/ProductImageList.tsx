"use client";

import { useState, useEffect } from "react";
import styles from "./productImageList.module.scss";
import urlFor from "../lib/urlFor";
import Image from "next/image";

type Props = {
  data: Product;
};

export default function ProductImageList(props: Props) {
  const { data } = props;

  const buildArr = (data: Product) => {
    let imageArr = [];
    imageArr.push(data?.image);
    imageArr.push(data?.productImages);

    return imageArr;
  };

  const imageData = buildArr(data).flat();
  const [mainImage, setMainImage] = useState({
    image: urlFor(imageData[0]?.asset).url(),
    alt: imageData[0]?.alt,
  });

  return (
    <>
      <div className={styles.image}>
        <Image
          src={mainImage?.image}
          alt={mainImage?.alt ? mainImage?.alt : ""}
          sizes="(min-width: 50px) 50vw"
          style={{
            objectFit: "cover",
          }}
          fill
        />
      </div>
      <div className={styles.productImageList}>
        {imageData.map((item, i) => {
          return (
            <button
              onClick={() =>
                setMainImage({
                  image: urlFor(item?.asset).url(),
                  alt: item?.alt,
                })
              }
              className={styles.mainImage}
              key={i}
            >
              <Image
                src={urlFor(item?.asset).url()}
                alt={item?.alt ? item?.alt : ""}
                style={{
                  objectFit: "cover",
                }}
                width={50}
                height={50}
              />
            </button>
          );
        })}
      </div>
    </>
  );
}
