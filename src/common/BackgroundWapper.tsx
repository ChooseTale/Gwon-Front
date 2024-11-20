import { type ReactNode } from "react";
import Image from "next/image";
import texture from "@asset/texture/paper.jpg";

export default function BackgroundWapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={texture.src}
        sizes="(max-width: 640px) 100vw, 640px"
        alt="Background Texture"
        fill
        style={{ objectFit: "cover" }}
        priority
        quality={75}
      />
      <div className="relative w-full h-full z-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
