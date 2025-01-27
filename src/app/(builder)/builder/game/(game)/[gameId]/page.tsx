"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Panel,
  addEdge,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { builder } from "@/app/(actions)/builder/builder";
import { getAll } from "@choosetale/nestia-type/lib/functional/game";
import dagre from "@dagrejs/dagre";

import "@xyflow/react/dist/style.css";
import { useParams, useRouter } from "next/navigation";
import BuilderGameTopNav from "./_component/TopNav";
import NewPageButton from "./_component/NewPageButton";
import { createPageCall } from "@/app/(actions)/builder/page/page";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 50;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

export default function GameBuilder() {
  const { gameId } = useParams();

  const [game, setGame] = useState<getAll.Output | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<{
    id: string;
    position: { x: number; y: number };
    data: { label: string };
  }>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<{
    id: string;
    source: string;
    target: string;
  }>([]);
  const router = useRouter();

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );
  const onLayout = useCallback(
    (direction: "TB" | "LR") => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const onNodeClick = (event: any, node: any) => {
    router.push(`/builder/game/${game?.id}/page/${node.id}`);
  };

  const handleNewPageButtonClick = async () => {
    const newPage = await createPageCall(Number(gameId), {});
    router.push(`/builder/game/${game?.id}/page/${newPage.id}`);
  };

  useEffect(() => {
    const getVerticalNodes = async () => {
      const game = await builder(Number(gameId));
      setGame(game);
      if (game) {
        const newNodes = game.pages.map((page, idx) => {
          page.choices.forEach((choice) => {
            setEdges((prev) => {
              const newEdgeId = `${choice.fromPageId}-${choice.toPageId}`;
              if (prev.some((edge) => edge.id === newEdgeId)) {
                return prev; // 중복 방지
              }
              return [
                ...prev,
                {
                  id: newEdgeId,
                  source: choice.fromPageId.toString(),
                  target: choice?.toPageId?.toString() ?? "",
                },
              ];
            });
          });

          return {
            id: page.id.toString(),
            position: { x: idx * 100, y: page.depth * 100 },
            data: { label: page.title },
          };
        });
        setNodes(newNodes);
      }
    };
    getVerticalNodes();
  }, [setEdges, setNodes]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-red-500">
      <BuilderGameTopNav
        gameTitle={game?.title ?? ""}
        handleComplete={() => {}}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        style={{ backgroundColor: "#F7F9FB" }}
        onNodeClick={onNodeClick}
      >
        <Panel position="top-right">
          <div
            className="flex flex-row  w-[114px] h-[36px]
          rounded-[8px] items-center justify-center bg-white
          flex-1"
          >
            <div className="flex w-full h-full justify-center border-r border-gray-50">
              <button
                className="caption-md text-black "
                onClick={() => onLayout("LR")}
              >
                가로정렬
              </button>
            </div>
            <div className="flex w-full h-full justify-center">
              <button
                className="caption-md text-black"
                onClick={() => onLayout("TB")}
              >
                세로정렬
              </button>
            </div>
          </div>
        </Panel>
        <Background />
        <div className="absolute bottom-[125px] left-[5px]">
          <Controls />
        </div>
      </ReactFlow>
      <NewPageButton onClick={handleNewPageButtonClick} />
    </div>
  );
}
