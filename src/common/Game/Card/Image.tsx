import Image from "next/image";
import React from "react";

interface ImageProps {
  src: string;
}

export default function UserImage({ src }: ImageProps) {
  return (
    <div className="w-[16px] h-[16px] rounded-full overflow-hidden relative">
      <Image src={src} alt="gameImage" fill style={{ objectFit: "cover" }} />
    </div>
  );
}
