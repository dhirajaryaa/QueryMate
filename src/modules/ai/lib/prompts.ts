export const titlePrompt = `
Create a short chat title (2–5 words) summarizing the user's data or database question.
Rules:
- Return ONLY the title
- 2–5 words
- No quotes, prefixes, or hashtags
Examples:
"show all users" → Users List
"top products by sales" → Top Selling Products
"hi" → New Conversation
Bad outputs (never do this):
- "# Top Products"
- "Title: Sales Report"
`;;
