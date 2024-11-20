"use client";
import { type SyntheticEvent, useState, useMemo } from "react";
import Image, { type ImageProps } from "next/image";
import { ImageIcon } from "@radix-ui/react-icons";
import {
  getPlaceholderImageOnError,
  placeholderSrc,
} from "@/utils/getPlaceholderImageOnError";

interface ErrorHandlingImageProps extends Omit<ImageProps, "src"> {
  src: string | null;
  hasErrorDisplay?: boolean;
}

export default function ImageWithError({
  src,
  alt,
  sizes = "(max-width: 600px) 80vw, 400px",
  hasErrorDisplay = false,
}: ErrorHandlingImageProps) {
  const [hasError, setHasError] = useState(false);
  let currentSrc = "";
  if (src && !src.includes("undefined")) {
    currentSrc = src;
  }

  const handleImageError = useMemo(() => {
    return (e: SyntheticEvent<HTMLImageElement>) => {
      if (hasError) return;
      setHasError(true);
      getPlaceholderImageOnError(e);
    };
  }, [hasError]);

  const MemoizedImage = useMemo(() => {
    return (
      <Image
        src={currentSrc || placeholderSrc}
        alt={alt}
        fill
        sizes={sizes}
        style={{ objectFit: "cover" }}
        onError={handleImageError}
      />
    );
  }, [currentSrc, alt, sizes, handleImageError]);

  return (
    <>
      {MemoizedImage}
      {(hasError || !currentSrc) && hasErrorDisplay && (
        <div className="absolute w-full h-full rounded-md border border-red-500 flex justify-center items-center z-10">
          <ImageIcon className="w-10 h-10" color="#aaaaaa" />
          <div className="w-[42px] border-b-2 absolute border-[#aaaaaa] -rotate-45" />
        </div>
      )}
    </>
  );
}
