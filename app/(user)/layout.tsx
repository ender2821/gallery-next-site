import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.scss";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import styles from "./home.module.scss";
import NavDrawer from "./components/NavDrawer";
import Head from "next/head";
import Link from "next/link";
import GoogleAnalytics from "./components/GoogleAnalytics";

const notoSans = Noto_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "He/Hem LLC",
  description:
    "Custom Garments, alterations, and sewing lessons at an affordable price",
  icons: [
    // {
    //   rel: "icon",
    //   type: "image/png",
    //   sizes: "32x32",
    //   url: "/favicons/favicon-32x32.png",
    // },
    // {
    //   rel: "icon",
    //   type: "image/png",
    //   sizes: "16x16",
    //   url: "/favicons/favicon-16x16.png",
    // },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicons/apple-touch-icon.png",
    },
    {
      rel: "mask-icon",
      sizes: "180x180",
      url: "/favicons/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
  ],
};

const query = groq`
  *[_type == "page"][0]{
    address,
    email,
    name,
    businessName,
    name,
    phone,
    logo
  }
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const revalidate = 60;
  const data = await client.fetch(query, {
    next: revalidate,
  });
  const { phone, logo, name, email, address, businessName } = data as Global;

  const year = new Date().getFullYear();
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Display:&display=optional"
        />
      </Head>
      <html lang="en">
        <body className={notoSans.className}>
          <div className={styles.container}>
            <NavDrawer logo={logo} />
            <div className={styles.content}>
              {children}
              <footer className={styles.footer}>
                <p>
                  {name && name} |{" "}
                  {email && <Link href={`mailto:${email}`}>{email}</Link>} |{" "}
                  {phone && <Link href={`tel:${phone}`}>{phone}</Link>} |{" "}
                  {address && (
                    <Link
                      href={`http://maps.google.com/maps?q=${encodeURIComponent(
                        address
                      )}`}
                      target="_blank"
                    >
                      {address}
                    </Link>
                  )}{" "}
                  |{" "}
                  {businessName &&
                    `©${year} ${businessName}, all rights reserved.`}
                </p>
              </footer>
            </div>
          </div>
          <GoogleAnalytics />
        </body>
      </html>
    </>
  );
}
