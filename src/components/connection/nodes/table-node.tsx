import type { Node, NodeProps } from "@xyflow/react";

type Props = {
  tableName: string;
  fields: { name: string }[];
};
type TableNode = Node<Props, "string">;

export default function TableNode({ data }: NodeProps<TableNode>) {
  return (
    <div className="border rounded-lg bg-background min-w-23 shadow-lg">
      <div className="font-semibold rounded-lg text-sm px-3 py-1.5 bg-muted">
        {data.tableName}
      </div>
      <div className="w-full h-full flex flex-col">
        {data.fields.map((field) => (
          <div key={field.name} className="text-xs border-t p-1 px-3">
            {field.name}
          </div>
        ))}
      </div>
    </div>
  );
}
