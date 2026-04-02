import { Edge } from "@xyflow/react";

type Relation = {
  table_name: string;
  column_name: string;
  foreign_table: string;
  foreign_column: string;
};

export function schemaToEdge(relations: Relation[]): Edge[] {
  const edges: Edge[] = [];

  relations.forEach((edge) => {
    edges.push({
      id: `${edge.table_name}_${edge.column_name}`,
      source: edge.table_name,
      target: edge.foreign_table,
      animated: true,
      label: `${edge.column_name}-> ${edge.foreign_column}`,
    });
  });

  return edges;
}
