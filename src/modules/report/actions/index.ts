"use server";

import { headers } from "next/headers";
import { AppError } from "@/lib/errors";
import { telegramMessageSend } from "@/modules/report/services/telegram-service";
import { ReportPayload } from "@/modules/report/types/report";
import { handleServerActionError } from "@/utils/handle-errors";
import { AppResponse } from "@/types/app.types";
import { requireUser } from "@/modules/auth/utils/require-user";
import { reportSchema } from "@/modules/report/schema/report";

export const sendReport = async (
    data: ReportPayload,
): Promise<AppResponse<null>> => {
    try {
        // get user
        const user = await requireUser();
        const userInfo = user
            ? `${user.name}, Email: ${user.email}`
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
👤 *User:* ${userInfo}
🌐 *IP:* ${ip}
🗓️ *Submitted:* ${data.submittedOn}
`;

        // send on telegram
        const res = await telegramMessageSend(message,data.type);

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
