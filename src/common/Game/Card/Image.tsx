import Image from "next/image";
import React from "react";

interface ImageProps {
  src: string;
}

export default function UserImage({ src }: ImageProps) {
  return (
    <div className="w-[16px] h-[16px] rounded-full overflow-hidden">
      <Image src={src} alt="gameImage" width={16} height={16} />
    </div>
  );
}
