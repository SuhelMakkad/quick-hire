"use client";

import { useState, useEffect } from "react";

export type PdfViewerProps = {
  src: string;
};

const getBlobUrlFromUrl = async (src: string) => {
  const res = await fetch(src);
  if (!res.ok) return;

  return URL.createObjectURL(await res.blob());
};

const PdfViewer = ({ src }: PdfViewerProps) => {
  const [blogSrc, setBlogSrc] = useState<string>("");

  useEffect(() => {
    getBlobUrlFromUrl(src).then(setBlogSrc);
  }, [src]);

  if (!blogSrc) return;

  return (
    <embed
      src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${blogSrc}`}
      type="application/pdf"
      frameBorder="0"
      scrolling="auto"
      height="100%"
      width="100%"
    />
  );
};

export default PdfViewer;
