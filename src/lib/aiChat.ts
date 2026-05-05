import api from "./api";

export type AiChatLanguage = "en" | "ind";

export type AiChatTokenUsageItem = {
  provider: string;
  input: number;
  output: number;
};

export type AiChatTurnResponse = {
  sessionId: string;
  reply: string;
  traceId: string;
  recordedAt: string;
  tokenUsage: {
    items: AiChatTokenUsageItem[];
    totalInput: number;
    totalOutput: number;
  };
};

export type CloseAiChatSessionResponse = {
  sessionId: string;
  traceId: string;
  recordedAt: string;
  status: "closed";
};

export type AiChatStatusResponse = {
  service: "lifelines-ai";
  reachable: boolean;
  traceId: string;
  recordedAt: string;
  health: {
    path: string;
    status?: string;
  };
  routes: {
    sessionStartPath: string;
    messagePath: string;
    sessionClosePath: string;
    historyPath: string;
    systemTimelinePath: string;
  };
  errorMessage?: string;
};

export type AiChatHistoryItem = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  recordedAt: string;
  sessionId: string | null;
  boundaryType: string | null;
};

export type AiChatHistoryResponse = {
  items: AiChatHistoryItem[];
  nextCursor: string | null;
  activeSessionId: string | null;
  traceId: string;
  recordedAt: string;
};

export type AiChatSystemEntryResponse = {
  item: AiChatHistoryItem;
  traceId: string;
  recordedAt: string;
};

export type StartAiChatSessionPayload = {
  sessionId?: string;
  message?: string;
  personality?: number;
  language?: AiChatLanguage;
  greeting?: boolean;
  memoryEnabled?: boolean;
};

export type SendAiChatMessagePayload = {
  sessionId: string;
  message: string;
  personality?: number;
  language?: AiChatLanguage;
  memoryEnabled?: boolean;
};

export const createAiChatTraceId = (sessionId?: string) => {
  const randomPart =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}`;

  return `web-ai-chat:${sessionId ?? "session"}:${randomPart}`;
};

export const isAiChatDevModeEnabled = () => {
  const rawValue = (import.meta.env.VITE_AI_CHAT_DEV_MODE || "").toLowerCase();

  return import.meta.env.DEV && ["1", "true", "yes", "on"].includes(rawValue);
};

export const startAiChatSession = async (
  payload: StartAiChatSessionPayload,
  traceId: string,
) => {
  const response = await api.post<AiChatTurnResponse>(
    "/ai-chat/session",
    payload,
    {
      headers: {
        "X-Trace-Id": traceId,
      },
    },
  );

  return response.data;
};

export const getAiChatStatus = async (traceId: string) => {
  const response = await api.get<AiChatStatusResponse>("/ai-chat/status", {
    headers: {
      "X-Trace-Id": traceId,
    },
  });

  return response.data;
};

export const getAiChatHistory = async (
  options: { cursor?: string; limit?: number },
  traceId: string,
) => {
  const response = await api.get<AiChatHistoryResponse>("/ai-chat/history", {
    headers: {
      "X-Trace-Id": traceId,
    },
    params: {
      cursor: options.cursor,
      limit: options.limit,
    },
  });

  return response.data;
};

export const sendAiChatMessage = async (
  payload: SendAiChatMessagePayload,
  traceId: string,
) => {
  const response = await api.post<AiChatTurnResponse>(
    "/ai-chat/messages",
    payload,
    {
      headers: {
        "X-Trace-Id": traceId,
      },
    },
  );

  return response.data;
};

export const createAiChatSystemEntry = async (
  payload: {
    sessionId: string;
    content: string;
    boundaryType: "memory-on" | "memory-off" | "session-start" | "session-end";
  },
  traceId: string,
) => {
  const response = await api.post<AiChatSystemEntryResponse>(
    "/ai-chat/timeline/system",
    payload,
    {
      headers: {
        "X-Trace-Id": traceId,
      },
    },
  );

  return response.data;
};

export const closeAiChatSession = async (
  sessionId: string,
  traceId: string,
) => {
  const response = await api.delete<CloseAiChatSessionResponse>(
    `/ai-chat/session/${sessionId}`,
    {
      headers: {
        "X-Trace-Id": traceId,
      },
    },
  );

  return response.data;
};
