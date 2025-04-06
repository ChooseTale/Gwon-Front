import React from "react";
import MarginWrapper from "../_component/MarginWrapper";

export default function layout({ children }: { children: React.ReactNode }) {
  return <MarginWrapper>{children}</MarginWrapper>;
}
