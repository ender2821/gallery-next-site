"use client";

import { InlineWidget } from "react-calendly";

type Props = {
  schedule: string;
};

export default function Schedule(props: Props) {
  const { schedule } = props;
  return (
    <InlineWidget
      url={`https://calendly.com/${schedule}`}
      styles={{
        height: "900px",
      }}
    />
  );
}
