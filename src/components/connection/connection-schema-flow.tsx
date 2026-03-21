"use client";

import { useRef, useState } from "react";
import { ConnectionSchema } from "@/types/connection.types";
import "@xyflow/react/dist/style.css";
import {
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  Node,
  ReactFlow,
} from "@xyflow/react";
import TableNode from "./nodes/table-node";
import SchemaToNode from "@/utils/schema-to-node";
import { Expand } from "lucide-react";

export default function ConnectionSchemaFlow({
  schema,
}: {
  schema: ConnectionSchema;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rowSchema, setRowSchema] = useState<ConnectionSchema>(schema);

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

  console.log(rowSchema);

  const nodeTypes = {
    schemaNode: TableNode,
  };

  const initialNode = SchemaToNode(rowSchema.structure as any);

  return (
    <div style={{ height: "100%", width: "100%" }} ref={containerRef}>
      <ReactFlow nodes={initialNode} nodeTypes={nodeTypes}>
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
