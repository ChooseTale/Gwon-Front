"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function GamePlayPage() {
  const { playId } = useParams();
  return <div>GamePlayPage</div>;
}
