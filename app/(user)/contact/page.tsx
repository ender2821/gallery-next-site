import styles from "./contact.module.scss";
import { Noto_Serif_Display } from "next/font/google";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Divider from "../components/Divider";
import { PortableText } from "@portabletext/react";
import CallIcon from "@mui/icons-material/Call";
import ContactForm from "../components/ContactForm";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Tiktok from "../../assets/tiktok.svg";
import ContactImage from "./ContactImage";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export const dynamic = "force-dynamic";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

const contactQuery = groq`
  *[_type == "contact"][0]{
    name,
    pageContent,
    tiktok,
    facebook,
    instagram
  }
`;

export default async function CustomGarments() {
  const revalidate = 60;
  const contactData: Contact = await client.fetch(contactQuery, {
    next: revalidate,
  });

  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <CallIcon />
          </div>
          {contactData?.name && (
            <h1 className={notoSerifDisplay.className}>{contactData?.name}</h1>
          )}
          <div className={styles.contentBody}>
            {contactData?.pageContent && (
              <PortableText value={contactData?.pageContent} />
            )}
          </div>
          <div className={styles.socialLinks}>
            {contactData?.facebook && (
              <Link
                href={contactData?.facebook}
                target="_blank"
                aria-label="facebook"
              >
                <FacebookIcon />
              </Link>
            )}
            {contactData?.instagram && (
              <Link
                href={contactData?.instagram}
                target="_blank"
                aria-label="instagram"
              >
                <InstagramIcon />
              </Link>
            )}
            {contactData?.tiktok && (
              <Link
                href={contactData?.tiktok}
                target="_blank"
                aria-label="tiktok"
              >
                <Tiktok />
              </Link>
            )}
          </div>
          <Divider />
          <ContactForm />
        </div>
        <div className={styles.imageContain}>
          <Suspense fallback={<LoadingSpinner />}>
            <ContactImage />
          </Suspense>
        </div>
      </section>
    </>
  );
}
