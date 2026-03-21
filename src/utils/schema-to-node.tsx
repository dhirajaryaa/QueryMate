import { Node } from "@xyflow/react";

type Schema = Record<string, string[]>;

function SchemaToNode(schema: Schema): Node[] {
  const nodes: Node[] = [];

  let x = 45;
  let y = 67;

  const gapX = 300;
  const perRow = 3;

  const rowHeight = 40;     // each field row height
  const headerHeight = 0;  // table header
  const padding = 20;

  let currentRowMaxHeight = 0;

  Object.entries(schema).forEach(([tableName, columns], index) => {
    // 🔥 dynamic height calculate
    const nodeHeight =
      headerHeight + columns.length * rowHeight + padding;

    currentRowMaxHeight = Math.max(currentRowMaxHeight, nodeHeight);

    nodes.push({
      id: `${tableName}_${index}`,
      type: "schemaNode",
      data: {
        tableName,
        fields: columns.map((col) => ({ name: col })),
      },
      position: { x, y },
    });

    // 👉 move to next column
    if ((index + 1) % perRow === 0) {
      x = 2;
      y += currentRowMaxHeight + 0 ; // ✅ dynamic gap
      currentRowMaxHeight = 0;
    } else {
      x += gapX;
    }
  });

  return nodes;
}

export default SchemaToNode;