"use client";

import Svg from "@/common/Svg";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  console.log(theme);
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-center"
      duration={3000}
      icons={{
        error: (
          <Svg
            icon="failIcon"
            options={{ size: { width: 20, height: 20 }, viewBox: "0 0 20 20" }}
          />
        ),
        success: (
          <Svg
            icon="successIcon"
            options={{ size: { width: 20, height: 20 }, viewBox: "0 0 20 20" }}
          />
        ),
      }}
      toastOptions={{
        classNames: {
          success:
            " group-[.toaster]:body-sb group-[.toaster]:text-white group-[.toaster]:bg-gray-800",
          error:
            " group-[.toaster]:body-sb group-[.toaster]:text-white group-[.toaster]:bg-gray-800",
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:px-[16px] group-[.toaster]:py-[12px] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
