import { AgentEvent } from "@/types/agent.types";
import { logger } from "./logger";

export function streamChatResponse(completions: AsyncGenerator<AgentEvent>) {
  let assistantMessage = "";
  let closed = false;

  const encoder = new TextEncoder();

  let resolveDone!: () => void;
  const done = new Promise<void>((resolve) => {
    resolveDone = resolve;
  });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of completions) {
          if (closed) break;

          // collect assistant text for DB
          if (event.type === "text") {
            assistantMessage += event.data;
          }

          const payload =
            `event: ${event.type}\n` +
            `data: ${JSON.stringify(event.data)}\n\n`;

          try {
            controller.enqueue(encoder.encode(payload));
          } catch {
            closed = true;
            logger.warn("Client disconnected during stream");
            break;
          }
        }

        if (!closed) {
          controller.close();
          closed = true;
          logger.debug("AI stream finished");
        }
      } catch (error) {
        logger.error(error, "AI stream failed");

        if (!closed) {
          closed = true;
          controller.error(error);
        }
      } finally {
        resolveDone(); // stream finished
      }
    },
  });

  return {
    stream,
    done,
    getAssistantMessage: () => assistantMessage,
  };
}
