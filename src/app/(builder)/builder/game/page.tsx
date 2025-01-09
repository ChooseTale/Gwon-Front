"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ReactFlow, Controls, Background, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { builder } from "@/app/(actions)/builder/builder";
import { getAll } from "@choosetale/nestia-type/lib/functional/game";

export default function GameBuilder() {
  const [game, setGame] = useState<getAll.Output | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (game) {
      setNodes(
        game.pages.map((page, idx) => {
          page.choices.forEach((choice) => {
            setEdges((prev) => [
              ...prev,
              {
                id: `${choice.fromPageId}-${choice.toPageId}`,
                source: choice.fromPageId.toString(),
                target: choice?.toPageId?.toString() ?? "",
              },
            ]);
          });

          return {
            id: page.id.toString(),
            position: { x: idx * 100, y: page.depth * 100 },
            data: { label: page.title },
          };
        })
      );
    }
  }, [game]);

  useEffect(() => {
    const getGame = async () => {
      const game = await builder(1);
      console.log(game);
      setGame(game);
    };
    getGame();
  }, []);
  return (
    <div className="w-full h-full ">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
