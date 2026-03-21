"use client";

import { useRef, useState } from "react";
import { ConnectionSchema } from "@/types/connection.types";
import "@xyflow/react/dist/style.css";
import {
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import TableNode from "./nodes/table-node";
import SchemaToNode from "@/utils/schema-to-node";
import { Expand } from "lucide-react";
import { schemaToEdge } from "@/utils/schema-to-edge";

export default function ConnectionSchemaFlow({
  schema,
}: {
  schema: ConnectionSchema;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // handle full screen view
  const handleFullScreen = () => {
    const el = containerRef.current;

    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  const nodeTypes = {
    schemaNode: TableNode,
  };

  const initialNode: Node[] = SchemaToNode(schema.structure as any);
  const initialEdge: Edge[] = schemaToEdge(schema.relationships as any);

  const [nodes, setNodes, onNodeChange] = useNodesState(initialNode);
  const [edges, setEdges, onEdgeChange] = useEdgesState(initialEdge);

  return (
    <div style={{ height: "100%", width: "100%" }} ref={containerRef}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodeChange}
        edges={edges}
        onEdgesChange={onEdgeChange}
      >
        <Background
          id="1"
          gap={10}
          color="#f1f1f1"
          variant={BackgroundVariant.Lines}
          bgColor="#fff"
        />
        <Controls>
          <ControlButton title="full screen view" onClick={handleFullScreen}>
            <Expand />
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
}
