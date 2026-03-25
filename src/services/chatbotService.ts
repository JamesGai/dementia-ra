import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// const CHATBOT_API_URL = "/api/chat"; // Local
// const CHATBOT_API_URL = "http://192.168.1.125:5050/api/chat"; // Emulator
const CHATBOT_API_URL = "https://dementia-ra-chatbot.onrender.com/api/chat"; // Public

type ChatbotResponsePayload = {
  response?: string;
  error?: string;
};

export type ChatHistoryMessage = {
  id: number;
  sender: "bot" | "user";
  text: string;
  createdAt: number;
};

type UserChatHistoryPayload = {
  chatHistory?: ChatHistoryMessage[];
};

/**
 * Runtime type guard for entries loaded from Firestore chatHistory.
 *
 * @param value Unknown Firestore value to validate.
 * @returns `true` when the value matches the `ChatHistoryMessage` shape.
 */
function isChatHistoryMessage(value: unknown): value is ChatHistoryMessage {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ChatHistoryMessage>;
  return (
    typeof item.id === "number" &&
    (item.sender === "bot" || item.sender === "user") &&
    typeof item.text === "string" &&
    typeof item.createdAt === "number"
  );
}

/**
 * Sends a user prompt to the chatbot API and returns the chatbot reply text.
 *
 * @param prompt User message to send to the chatbot backend.
 * @returns The trimmed chatbot reply text.
 */
export async function getChatbotReply(prompt: string): Promise<string> {
  console.log("Chatbot API URL:", CHATBOT_API_URL);
  const res = await fetch(CHATBOT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const rawBody = await res.text();
  let data: ChatbotResponsePayload = {};
  if (rawBody) {
    try {
      data = JSON.parse(rawBody) as ChatbotResponsePayload;
    } catch {
      if (!res.ok) {
        throw new Error(`Chatbot API request failed (${res.status}).`);
      }
      throw new Error("Chatbot service returned an invalid response format.");
    }
  }
  if (!res.ok) {
    throw new Error(
      data.error || `Chatbot API request failed (${res.status}).`,
    );
  }
  const reply = (data.response || "").trim();
  if (!reply) {
    throw new Error("Chatbot service returned an empty response.");
  }
  return reply;
}

/**
 * Reads `users/{uid}.chatHistory` from Firestore and returns only valid messages.
 *
 * @param uid Firebase Auth user ID.
 * @returns A filtered chat history array containing only valid messages.
 */
export async function fetchChatHistory(
  uid: string,
): Promise<ChatHistoryMessage[]> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return [];
  const data = snap.data() as UserChatHistoryPayload;
  if (!Array.isArray(data.chatHistory)) return [];
  return data.chatHistory.filter(isChatHistoryMessage);
}

/**
 * Persists full chat history into `users/{uid}.chatHistory` (merge update).
 *
 * @param uid Firebase Auth user ID.
 * @param messages Full chat history to store for the user.
 */
export async function saveChatHistory(
  uid: string,
  messages: ChatHistoryMessage[],
): Promise<void> {
  await setDoc(
    doc(db, "users", uid),
    {
      chatHistory: messages,
    },
    { merge: true },
  );
}

/**
 * Clears the persisted chat history for the given user.
 *
 * @param uid Firebase Auth user ID.
 */
export async function clearChatHistory(uid: string): Promise<void> {
  await setDoc(
    doc(db, "users", uid),
    {
      chatHistory: [],
    },
    { merge: true },
  );
}
