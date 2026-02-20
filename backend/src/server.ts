import app from "./app.js";
import logger from "@QueryMate/logger"; //!package/logger 

// start server 
app.listen(()=>{
    logger.info(`API Server running`)
});