export async function telegramMessageSend(message: string, type: string): Promise<{ success: boolean }> {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramGroupId = process.env.TELEGRAM_GROUP_ID
  const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
  const messageTopicId: Record<string, number> = {
    bug: 3,
    feature: 4,
    log: 5,
  }


  // send on telegram
  const response = await fetch(telegramApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: telegramGroupId,
      message_thread_id: messageTopicId[type],
      text: message,
      parse_mode: "Markdown",
    }),
  });
  if (!response.ok) {
    { success: false }
  }
  return { success: true }
}
