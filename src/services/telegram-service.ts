export async function telegramMessageSend(message: string):Promise<{success:boolean}> {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
  // send on telegram
  const response = await fetch(telegramApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: message,
      parse_mode: "Markdown",
    }),
  });
  if(!response.ok){
    {success:false}
  }
  return {success:true}
}
