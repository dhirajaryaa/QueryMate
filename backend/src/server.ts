import app from "./app";
import { NODE_ENV, PORT } from "./config/env";
//!package/logger  local package from workspace
import logger from "@QueryMate/logger"; 

try {
    //? start server 
    app.listen(PORT,()=>{
        logger.info(`API ${NODE_ENV} server running on port ${PORT}`)
    });
} catch (error) {
    logger.error("Failed to run server");
    process.exit(1);
}