import { type ForwardedRef, forwardRef } from "react";
import dynamic from "next/dynamic";
import { type Editor, type EditorProps } from "@toast-ui/react-editor";

export const DynamicEditor = dynamic(
  () => import("@/components/common/editor/Editor"),
  {
    ssr: false,
    loading: () => null,
  }
);
DynamicEditor.displayName = "DynamicEditor";

export const ForwardedEditor = forwardRef(
  (props: EditorProps, forwardedRef: ForwardedRef<Editor>) => {
    return <DynamicEditor {...props} forwardedRef={forwardedRef} />;
  }
);
ForwardedEditor.displayName = "ForwardedEditor";
