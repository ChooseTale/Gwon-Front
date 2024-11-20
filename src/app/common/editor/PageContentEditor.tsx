"use client";
import React, { useRef } from "react";
import { type EditorProps, type Editor } from "@toast-ui/react-editor";
import { DynamicEditor } from "@/components/common/editor/DynamicEditor";
import FieldErrorMessage from "../form/FieldErrorMessage";

interface PageContentProps extends EditorProps {
  initialValue: string;
  errMsg?: string;
}

export default function PageContentEditor({
  initialValue,
  errMsg,
  height: heightProp,
  ...props
}: PageContentProps) {
  const ref = useRef<Editor>(null);
  const height = heightProp ? heightProp : "40vh";

  return (
    <div id="editor">
      <div
        className={`bg-gray-100 ${errMsg && "border rounded-sm border-red-500"}`}
        style={{ minHeight: height }}
      >
        <DynamicEditor
          forwardedRef={ref}
          initialValue={initialValue}
          placeholder="페이지의 내용을 입력하세요"
          height={height}
          initialEditType="wysiwyg"
          hideModeSwitch
          toolbarItems={[
            ["heading", "bold", "italic", "strike", "hr", "quote"],
          ]}
          {...props}
        />
      </div>
      <div className="flex justify-end mt-2">
        {errMsg && <FieldErrorMessage message={errMsg} />}
      </div>
    </div>
  );
}
