"use client";

import { ImageList, ImageListItem, Modal, Box } from "@mui/material";
import styles from "./gallery.module.scss";
import Image from "next/image";
import urlFor from "../../utils/urlFor";
import Link from "next/link";
import { useState } from "react";

type GarmentGallery = {
  data: Image[];
  columns: number;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  minHeight: "90vh",
  minWidth: "90vw",
};

export default function GarmentGallery(props: GarmentGallery) {
  const { data, columns } = props;
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState(0);

  const handleOpen = (i: number) => {
    setOpen(true);
    setModalImage(i);
  };
  const handleClose = () => setOpen(false);

  const lastImage = data.length - 1;

  return (
    <div className={styles.gallery}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalImage !== 0 ? (
            <button
              onClick={() => {
                setModalImage(modalImage - 1);
              }}
              className={styles.button}
            >
              Previous
            </button>
          ) : null}
          {data.length > 0 && (
            <Image
              alt={data ? data[modalImage]?.alt : ""}
              src={data ? urlFor(data[modalImage]?.asset).url() : ""}
              sizes="100vw"
              style={{
                objectFit: "contain",
                zIndex: 0,
              }}
              fill
            ></Image>
          )}
          {modalImage !== lastImage ? (
            <button
              onClick={() => {
                setModalImage(modalImage + 1);
              }}
              className={styles.button}
            >
              Next
            </button>
          ) : null}{" "}
        </Box>
      </Modal>
      {data.length > 0 && (
        <ImageList variant="masonry" cols={columns} gap={8}>
          {data.map((item, i) => (
            <ImageListItem key={i}>
              <img
                src={`${urlFor(item?.asset).url()}?w=400&fit=crop&auto=format`}
                alt={item?.alt}
                loading="lazy"
                onClick={() => handleOpen(i)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
}
