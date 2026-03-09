import { listTablesTool } from "./tools/list-tables-tool";
import { getSchemaTool } from "./tools/get-schema-tool";
import { runQueryTool } from "./tools/run-query-tool";

export const availableTools = [
    { type: "function", function: listTablesTool.details },
    { type: "function", function: getSchemaTool.details },
    { type: "function", function: runQueryTool.details },
];