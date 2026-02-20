import app from "./app.js";
import { NODE_ENV, PORT } from "./config/env.js";
import logger from "@QueryMate/logger"; //!package/logger  local package from workspace

try {
    // start server 
    app.listen(PORT,()=>{
        logger.info(`API ${NODE_ENV} server running on port ${PORT}`)
    });
} catch (error) {
    logger.error("Failed to run server");
    process.exit(1);
}