"use client";

import { useEffect, useState } from "react";
import { assetPath } from "@/lib/assetPath";

export function FilmStrip({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setFrame((current) => (current + 1) % images.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="film">
      {images.map((image, imageIndex) => (
        <img
          key={image}
          src={assetPath(image)}
          alt={imageIndex === frame ? alt : ""}
          className={imageIndex === frame ? "is-on" : undefined}
        />
      ))}
    </div>
  );
}
