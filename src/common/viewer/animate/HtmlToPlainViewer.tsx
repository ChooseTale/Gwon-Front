"use client";
import { useState, useEffect } from "react";
import TypingText, { type TypingTextProps } from "../../text/TypingText";

interface HtmlViewerProps
  extends Pick<TypingTextProps, "initialDelay" | "speed"> {
  htmlContent: string;
}

export default function HtmlToPlainViewer({
  htmlContent,
  ...props
}: HtmlViewerProps) {
  const [textContent, setTextContent] = useState<string>("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const plainText = doc.body.textContent || "";
    setTextContent(plainText);
  }, [htmlContent]);

  return (
    <div className="html-viewer">
      <TypingText text={textContent} {...props} />
    </div>
  );
}
