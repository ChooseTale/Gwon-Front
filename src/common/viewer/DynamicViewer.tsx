import dynamic from "next/dynamic";

export const DynamicViewer = dynamic(
  () => import("@/components/common/viewer/Viewer"),
  {
    ssr: false,
    loading: () => null,
  }
);
