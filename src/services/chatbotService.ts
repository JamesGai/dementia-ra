const CHATBOT_API_URL =
  import.meta.env.VITE_CHATBOT_API_URL?.trim() || "/api/gemini";

type ChatbotResponsePayload = {
  response?: string;
  error?: string;
};

export async function getChatbotReply(prompt: string): Promise<string> {
  const res = await fetch(CHATBOT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = (await res.json()) as ChatbotResponsePayload;

  if (!res.ok) {
    throw new Error(data.error || `Chatbot API request failed (${res.status}).`);
  }

  const reply = (data.response || "").trim();

  if (!reply) {
    throw new Error("Chatbot service returned an empty response.");
  }

  return reply;
}
