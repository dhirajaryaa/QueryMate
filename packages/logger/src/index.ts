import pino from 'pino';


//? log level
const logLevel = process.env.NODE_ENV === "production" ? "info" : "debug";

// crate logger 
const logger = pino({
    level: logLevel,
    transport: {
        targets: [
            //* error log write in file */
            {
                target: "pino/file",
                level: 'error',
                options: {
                    destination: "./logs/error.log", mkdir: true,
                }
            },
            //* log write in file */
            {
                target: "pino/file",
                level: 'debug',
                options: {
                    destination: "./logs/combined.log", mkdir: true,
                }
            },
            //** console write logs */
            {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "yyyy-mm-dd HH:MM:ss",
                    ignore: "pid,hostname"
                }
            }
        ]
    }
})

export default logger;