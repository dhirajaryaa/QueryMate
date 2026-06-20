"use client";

import { useRef } from "react";
import "@xyflow/react/dist/style.css";
import { ConnectionSchema } from "@/modules/connection/types/connection.types";
import {
  Background,
  ControlButton,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import TableNode from "@/modules/connection/components/edit/table-node";
import SchemaToNode from "@/modules/connection/utils/schema-to-node";
import { Expand } from "lucide-react";
import { schemaToEdge } from "@/modules/connection/utils/schema-to-edge";
import { useTheme } from "next-themes";

export default function ConnectionSchemaFlow({
  schema,
}: {
  schema: ConnectionSchema;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  //? handle full screen view
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

  const { resolvedTheme } = useTheme();
  if (!resolvedTheme) return null;

  const initialNode: Node[] = SchemaToNode(schema.structure as any);
  const initialEdge: Edge[] = schemaToEdge(schema.relationships as any);

  const [nodes, setNodes, onNodeChange] = useNodesState(initialNode);
  const [edges, setEdges, onEdgeChange] = useEdgesState(initialEdge);

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      ref={containerRef}
      className="bg-accent text-foreground w-full"
    >
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodeChange}
        edges={edges}
        onEdgesChange={onEdgeChange}
        colorMode={resolvedTheme === "dark" ? "dark" : "light"}
      >
        <Background />
        <Controls>
          <ControlButton title="full screen view" onClick={handleFullScreen}>
            <Expand />
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
}
