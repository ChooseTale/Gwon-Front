"use client";
import React, { Fragment } from "react";
import TypingText from "./TypingText";

export interface TypingHtmlProps {
  htmlContent: string;
  speed?: "slow" | "normal" | "fast";
  initialDelay?: number;
  fontSize?: "sm" | "md" | "lg";
  className?: string;
}

export default function TypingHtml({
  htmlContent,
  initialDelay = 0,
  speed = "normal",
  className = "",
}: TypingHtmlProps) {
  const typingSpeed = {
    slow: 0.1 * 3,
    normal: 0.05 * 3,
    fast: 0.02 * 3,
  };
  const currentSpeed = typingSpeed[speed];

  const parseHtml = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.childNodes;
  };

  const renderInlineElement = (
    nodeName: string,
    renderClassName: string,
    children: React.ReactNode,
    key: number
  ) => {
    const Tag = nodeName as keyof JSX.IntrinsicElements;
    return (
      <Tag key={key} className={renderClassName}>
        {children}
      </Tag>
    );
  };

  const renderNode = (node: ChildNode, index: number): React.ReactNode => {
    const nodeName = node.nodeName.toLowerCase();
    const textContent = node.textContent?.trim() || "";
    const children = Array.from(node.childNodes).map((childNode, i) =>
      renderNode(childNode, i)
    );

    if (nodeName === "br") {
      return <div key={index} className="py-2" />;
    }

    if (nodeName === "hr") {
      return <hr key={index} className="my-4 border-t border-black" />;
    }

    if (node.nodeName === "#text" && textContent) {
      return (
        <TypingText
          key={index + textContent.slice(0, 5)}
          text={textContent}
          speed={speed}
          initialDelay={initialDelay + index * currentSpeed}
          fontSize="md"
        />
      );
    }

    if (nodeName === "p") {
      return <Fragment key={index}>{children}</Fragment>;
    }

    const inlineElementMap: Record<string, string> = {
      strong: "font-bold text-black px-[1px]",
      em: "italic px-[1px]",
      del: "line-through text-red-500 px-[1px]",
      blockquote: "pl-4 border-l-2 italic border-black",
    };

    if (inlineElementMap[nodeName]) {
      return renderInlineElement(
        nodeName,
        inlineElementMap[nodeName],
        children,
        index
      );
    }

    return <Fragment key={index}>{children}</Fragment>;
  };

  const elements = parseHtml(htmlContent);
  const contentArray = Array.from(elements).map((node, index) =>
    renderNode(node, index)
  );

  return <div className={`html-viewer ${className}`}>{contentArray}</div>;
}
