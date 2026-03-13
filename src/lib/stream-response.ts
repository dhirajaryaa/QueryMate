import { AgentEvent } from "@/types/agent.types";
import { logger } from "./logger";

export function streamChatResponse(completions: AsyncGenerator<AgentEvent>) {
  // stream response
  let assistantMessage: string = "";
  const encoder = new TextEncoder();
  let closed = false;

  let streamDone: () => void;
  const done = new Promise<void>((resolve) => {
    streamDone = resolve;
  });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of completions) {
          if (closed) break;
          // collect text for DB
          if (event.type === "text") {
            assistantMessage += event.data;
          }
          try {
            controller.enqueue(
              encoder.encode(
                `event: ${event.type}\ndata: ${JSON.stringify(event.data)}\n\n`,
              ),
            );
          } catch (error) {
            closed = true;
            logger.warn("Client disconnected during stream");
            break;
          }
        }

        if (!closed) {
          closed = true;
          controller.close();
        }
      } catch (error) {
        logger.error(error, "AI stream failed");

        if (!closed) {
          try {
            controller.enqueue(
              encoder.encode(
                `event: error\ndata: ${JSON.stringify({
                  code: "internal:stream",
                  message: "Response interrupted. Please retry.",
                })}\n\n`,
              ),
            );
          } catch {}

          closed = true;
          controller.close();
        }
      } finally {
        streamDone(); //? to return full assistant message.
      }
    },
  });

  return { stream, done, getAssistantMessage: () => assistantMessage };
}
