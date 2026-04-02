"use server";

import { auth } from "@/lib/auth";
import { AppError } from "@/lib/errors";
import { reportSchema } from "@/schema/report.schema";
import { telegramMessageSend } from "@/services/telegram-service";
import { AppResponse, ReportPayload } from "@/types/app.types";
import { handleServerActionError } from "@/utils/handle-errors";
import { headers } from "next/headers";

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;
const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

export const sendReportAction = async (
  data: ReportPayload,
): Promise<AppResponse<null>> => {
  try {
    // get user
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user
      ? `${session.user.name}, Email: ${session.user.email}`
      : "Anonymous";

    // get ip
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "unknown";

    // check data
    const valid = reportSchema.safeParse(data);
    if (!valid.success) {
      throw new AppError("bad_request:api", "invalid input check, try again!");
    }

    // parse message
    const message = `
🚀 *New ${data.type === "bug" ? "🐞 Bug" : "✨ Feature"} Report*

*📌 Title:* ${data.title},

*💬 Message:* 
${data.message.trim()}

━━━━━━━━━━━━━━━━━━
👤 *User:* ${user}
🌐 *IP:* ${ip}
🗓️ *Submitted:* ${data.submittedOn}
`;

    // send on telegram
    const res = await telegramMessageSend(message);

    // when error
    if (!res.success) {
      throw new AppError("internal:api", "failed to Submit Report!");
    }
    // when succuss
    return { success: true, data: null };
  } catch (error) {
    return handleServerActionError(error);
  }
};
