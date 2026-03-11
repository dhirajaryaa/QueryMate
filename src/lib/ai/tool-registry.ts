import { getDbInfoTool } from "./tools/get-db-info-tool";
import { getSchemaTool } from "./tools/get-schema-tool";
import { runQueryTool } from "./tools/run-query-tool";

// tools list
export const toolsList = [
  { type: "function", function: getDbInfoTool.details },
  { type: "function", function: getSchemaTool.details },
  { type: "function", function: runQueryTool.details },
];

// tools mapper
export const availableTools = {
  get_db_info : getDbInfoTool.execute,
  get_schema: getSchemaTool.execute,
  run_query: runQueryTool.execute,
};
