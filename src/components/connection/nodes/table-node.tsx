import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

type Props = {
  tableName: string;
  fields: { name: string; key: "PR" | "FR" }[];
};
type TableNode = Node<Props, "string">;

export default function TableNode({ data }: NodeProps<TableNode>) {
  return (
    <div className="border rounded-lg bg-background min-w-23 text-center shadow-lg overflow-hidden">
      <div className="font-semibold rounded-tl-lg text-sm px-3 py-1.5 bg-muted uppercase text-primary">
        {data.tableName}
      </div>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
      <ul className="w-full h-full flex flex-col">
        {data.fields.map((field) => {
          return (
            <li key={field.name} className="text-xs border-t p-1 px-3 lowercase">
              {field.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
