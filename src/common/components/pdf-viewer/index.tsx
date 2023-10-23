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
  const [blogSrc, setBlogSrc] = useState<string | undefined>("");

  useEffect(() => {
    getBlobUrlFromUrl(src).then((s) => setBlogSrc(s));
  }, [src]);

  if (!blogSrc) return;

  return <iframe src={blogSrc} height="100%" width="100%" />;
};

export default PdfViewer;
