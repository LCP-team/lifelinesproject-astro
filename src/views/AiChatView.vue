<template>
  <BaseLayout title="AI Chat">
    <div class="relative overflow-hidden bg-slate-50">
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_58%)]"
      />
      <div
        class="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full bg-primary/8 blur-3xl"
      />
      <div
        class="pointer-events-none absolute -left-20 top-40 h-60 w-60 rounded-full bg-sky-200/35 blur-3xl"
      />

      <div class="mx-auto max-w-5xl px-5 py-8 sm:py-12">
        <div class="mx-auto max-w-[760px]">
          <div class="mb-6 text-center">
            <p
              class="text-sm font-semibold uppercase tracking-[0.22em] text-primary"
            >
              AI Companion
            </p>
            <h1 class="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              LifeLines AI
            </h1>
            <p class="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              LifeLines AI is a companion AI, not a human. It stays kind,
              steady, and supportive while your chat stays connected through
              LifeLines API.
            </p>
          </div>

          <div
            v-if="!canUseChat"
            class="rounded-[32px] border border-amber-200 bg-white/95 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
          >
            <p class="text-2xl font-semibold text-slate-900">
              Sign in to start chatting
            </p>
            <p class="mt-3 text-sm leading-6 text-slate-600">
              We keep AI chat behind authenticated LifeLines API routes so real
              usage stays tied to a real account.
            </p>
            <RouterLink
              to="/signin"
              class="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white no-underline! transition hover:opacity-90"
            >
              Go to sign in
            </RouterLink>
          </div>

          <section
            v-else
            class="overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur"
          >
            <div class="border-b border-slate-200 px-5 py-5 sm:px-6 sm:py-6">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div class="flex items-center gap-3">
                    <div
                      class="flex h-11 w-11 items-center justify-center rounded-full bg-primary/12 text-primary"
                    >
                      <span class="text-lg font-semibold">AI</span>
                    </div>
                    <div>
                      <p class="text-xl font-semibold text-slate-900">
                        Sam - AI
                      </p>
                      <p class="text-sm text-slate-500">
                        Gentle support in the LifeLines tone.
                      </p>
                    </div>
                  </div>

                  <div class="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-100/80 p-1">
                    <button
                      type="button"
                      class="rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4"
                      :class="
                        memoryEnabled
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      "
                      :disabled="busy || updatingMemoryMode"
                      @click="handleMemoryModeChange(true)"
                    >
                      Memory on
                    </button>
                    <button
                      type="button"
                      class="rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4"
                      :class="
                        !memoryEnabled
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      "
                      :disabled="busy || updatingMemoryMode"
                      @click="handleMemoryModeChange(false)"
                    >
                      Memory off
                    </button>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                  <div
                    class="rounded-full border px-4 py-2 text-left"
                    :class="
                      memoryEnabled
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : 'border-amber-200 bg-amber-50 text-amber-900'
                    "
                  >
                    <p class="text-xs font-semibold uppercase tracking-[0.18em]">
                      {{ memoryEnabled ? "Memory on" : "Memory off" }}
                    </p>
                    <p class="mt-1 text-xs">
                      {{
                        memoryEnabled
                          ? "Sam remembers saved context"
                          : "Sam replies only to this session"
                      }}
                    </p>
                  </div>

                  <button
                    v-if="sessionId"
                    type="button"
                    class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                    :disabled="busy"
                    @click="handleEndSession"
                  >
                    {{ busy ? "Working..." : "End chat" }}
                  </button>
                </div>
              </div>

              <div
                v-if="errorMessage"
                class="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              >
                {{ errorMessage }}
              </div>
            </div>

            <div
              ref="messagesContainer"
              @scroll="handleMessagesScroll"
              class="flex min-h-[520px] max-h-[62vh] flex-col gap-4 overflow-y-auto bg-[linear-gradient(180deg,rgba(241,245,249,0.55),rgba(255,255,255,0.95))] px-4 py-6 sm:px-6"
            >
              <div v-if="historyCursor || loadingOlder" class="flex justify-center">
                <button
                  v-if="historyCursor"
                  type="button"
                  class="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                  :disabled="loadingOlder || busy"
                  @click="loadOlderHistory"
                >
                  {{ loadingOlder ? "Loading earlier messages..." : "Load earlier messages" }}
                </button>

                <div
                  v-else-if="loadingOlder"
                  class="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500"
                >
                  Loading earlier messages...
                </div>
              </div>

              <div
                v-if="messages.length === 0"
                class="my-auto rounded-[28px] border border-dashed border-slate-300 bg-white/80 px-6 py-10 text-center shadow-sm"
              >
                <div
                  class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <span class="text-xl font-semibold">AI</span>
                </div>
                <h2 class="mt-4 text-2xl font-semibold text-slate-900">
                  {{
                    busy
                      ? "Starting your conversation"
                      : errorMessage
                        ? "We could not start the chat"
                        : "Preparing Sam for you"
                  }}
                </h2>
                <p class="mt-3 text-sm leading-6 text-slate-500">
                  {{
                    busy
                      ? "We are sending <init> through LifeLines API so Sam can greet you with the existing AI opening."
                      : errorMessage
                        ? "Please try again to reconnect the chat session."
                        : "Sam will greet you automatically as soon as the page connects to LifeLines API."
                  }}
                </p>
                <div
                  v-if="errorMessage"
                  class="mt-6 flex flex-wrap justify-center gap-3"
                >
                  <button
                    type="button"
                    class="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    :disabled="busy"
                    @click="retryAutoStart"
                  >
                    {{ busy ? "Retrying..." : "Try again" }}
                  </button>
                </div>
              </div>

              <div
                v-for="message in messages"
                :key="message.id"
              >
                <div
                  v-if="message.role === 'system'"
                  class="mx-auto max-w-[92%] rounded-2xl border border-slate-200 bg-slate-100/80 px-4 py-3 text-center text-sm text-slate-600 shadow-sm sm:max-w-[78%]"
                >
                  <p class="whitespace-pre-wrap font-medium leading-6">
                    {{ message.content }}
                  </p>
                  <p class="mt-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    {{ formatTime(message.recordedAt) }}
                  </p>
                </div>

                <article
                  v-else
                  class="max-w-[86%] rounded-[26px] px-4 py-3 shadow-sm sm:px-5"
                  :class="
                    message.role === 'user'
                      ? 'ml-auto bg-sky-200 text-slate-800'
                      : 'border border-slate-200 bg-white text-slate-900'
                  "
                >
                  <p class="whitespace-pre-wrap text-sm leading-7 sm:text-[15px]">
                    {{ message.content }}
                  </p>
                  <p
                    class="mt-2 text-right text-xs"
                    :class="
                      message.role === 'user'
                        ? 'text-slate-500'
                        : 'text-slate-400'
                    "
                  >
                    {{ formatTime(message.recordedAt) }}
                  </p>
                </article>
              </div>

              <div
                v-if="busy"
                class="max-w-[72%] rounded-[26px] border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm"
              >
                LifeLines AI is thinking...
              </div>
            </div>

            <form
              class="border-t border-slate-200 bg-slate-50/90 px-4 py-4 sm:px-6 sm:py-5"
              @submit.prevent="handleSendMessage"
            >
              <div
                class="flex items-end gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
              >
                <textarea
                  v-model="draftMessage"
                  rows="1"
                  class="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent py-2 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400"
                  :disabled="busy || !sessionId || !canUseChat"
                  placeholder="Type here..."
                />
                <button
                  type="submit"
                  class="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  :disabled="
                    busy || !sessionId || !draftMessage.trim() || !canUseChat
                  "
                  aria-label="Send message"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    class="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 19 20 12 4 5l3 7-3 7Z"
                    />
                  </svg>
                </button>
              </div>

              <div
                class="mt-3 flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"
              >
                <p>
                  {{
                    sessionId
                      ? "Your messages go through LifeLines API before they reach the AI service."
                      : "The chat opens automatically and asks LifeLines AI to greet you first."
                  }}
                </p>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import {
  closeAiChatSession,
  createAiChatSystemEntry,
  createAiChatTraceId,
  getAiChatHistory,
  isAiChatDevModeEnabled,
  sendAiChatMessage,
  startAiChatSession,
  type AiChatHistoryItem,
  type AiChatLanguage,
  type AiChatTurnResponse,
} from "../lib/aiChat";
import { useAuthStore } from "../stores/auth";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  recordedAt: string;
  traceId: string;
  tokenUsage?: AiChatTurnResponse["tokenUsage"];
};

const MEMORY_MODE_STORAGE_KEY = "lifelines-ai:memory-mode";

const auth = useAuthStore();
const messages = ref<ChatMessage[]>([]);
const messagesContainer = ref<HTMLElement | null>(null);
const sessionId = ref<string | null>(null);
const draftMessage = ref("");
const errorMessage = ref("");
const busy = ref(false);
const loadingOlder = ref(false);
const updatingMemoryMode = ref(false);
const autoStartAttempted = ref(false);
const personality = ref(1);
const language = ref<AiChatLanguage>("en");
const memoryEnabled = ref(true);
const historyCursor = ref<string | null>(null);
const devMode = computed(() => isAiChatDevModeEnabled());
const canUseChat = computed(() => Boolean(auth.user) || devMode.value);

const addAssistantMessage = (response: AiChatTurnResponse) => {
  messages.value.push({
    id: response.traceId,
    role: "assistant",
    content: response.reply,
    recordedAt: response.recordedAt,
    traceId: response.traceId,
    tokenUsage: response.tokenUsage,
  });
};

const mapHistoryMessage = (message: AiChatHistoryItem): ChatMessage => ({
  id: message.id,
  role: message.role,
  content: message.content,
  recordedAt: message.recordedAt,
  traceId: `history:${message.id}`,
});

const scrollMessagesToBottom = async () => {
  await nextTick();
  const container = messagesContainer.value;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

const getErrorMessage = (error: unknown) => {
  const maybeAxiosError = error as {
    response?: { data?: { message?: string } };
    message?: string;
  };

  return (
    maybeAxiosError.response?.data?.message ||
    maybeAxiosError.message ||
    "We could not complete the AI chat request."
  );
};

const persistMemoryMode = (enabled: boolean) => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(MEMORY_MODE_STORAGE_KEY, enabled ? "on" : "off");
};

const restoreMemoryMode = () => {
  if (typeof window === "undefined") {
    return;
  }

  const storedValue = window.sessionStorage.getItem(MEMORY_MODE_STORAGE_KEY);
  if (storedValue === "off") {
    memoryEnabled.value = false;
  } else if (storedValue === "on") {
    memoryEnabled.value = true;
  }
};

const handleMemoryModeChange = async (enabled: boolean) => {
  if (memoryEnabled.value === enabled) {
    return;
  }

  if (!sessionId.value) {
    memoryEnabled.value = enabled;
    persistMemoryMode(enabled);
    return;
  }

  if (updatingMemoryMode.value) {
    return;
  }

  updatingMemoryMode.value = true;
  errorMessage.value = "";

  try {
    const response = await createAiChatSystemEntry(
      {
        sessionId: sessionId.value,
        content: enabled
          ? "Memory turned on\nSam can use your saved context again."
          : "Memory turned off\nSam will reply only from messages sent after this point.",
        boundaryType: enabled ? "memory-on" : "memory-off",
      },
      createAiChatTraceId(sessionId.value),
    );

    memoryEnabled.value = enabled;
    persistMemoryMode(enabled);
    messages.value.push(mapHistoryMessage(response.item));
    await scrollMessagesToBottom();
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
  } finally {
    updatingMemoryMode.value = false;
  }
};

const handleStartSession = async () => {
  if (!canUseChat.value || busy.value || sessionId.value) {
    return;
  }

  const traceId = createAiChatTraceId("session");
  busy.value = true;
  errorMessage.value = "";

  try {
    const response = await startAiChatSession(
      {
        message: "<init>",
        personality: personality.value,
        language: language.value,
        memoryEnabled: memoryEnabled.value,
      },
      traceId,
    );

    sessionId.value = response.sessionId;
    busy.value = false;
    await loadChatHistory();
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
  } finally {
    busy.value = false;
  }
};

const loadChatHistory = async () => {
  if (!canUseChat.value || busy.value) {
    return;
  }

  const traceId = createAiChatTraceId("history");
  busy.value = true;
  errorMessage.value = "";

  try {
    const response = await getAiChatHistory({ limit: 60 }, traceId);
    messages.value = response.items.map(mapHistoryMessage);
    historyCursor.value = response.nextCursor;
    sessionId.value = response.activeSessionId;
    await scrollMessagesToBottom();
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
  } finally {
    busy.value = false;
  }
};

const loadOlderHistory = async () => {
  if (!canUseChat.value || !historyCursor.value || loadingOlder.value) {
    return;
  }

  const container = messagesContainer.value;
  const previousHeight = container?.scrollHeight ?? 0;
  const previousTop = container?.scrollTop ?? 0;
  const traceId = createAiChatTraceId("history-page");

  loadingOlder.value = true;
  errorMessage.value = "";

  try {
    const response = await getAiChatHistory(
      { cursor: historyCursor.value, limit: 40 },
      traceId,
    );
    const knownIds = new Set(messages.value.map((message) => message.id));
    const olderMessages = response.items
      .map(mapHistoryMessage)
      .filter((message) => !knownIds.has(message.id));

    messages.value = [...olderMessages, ...messages.value];
    historyCursor.value = response.nextCursor;

    await nextTick();
    if (container) {
      container.scrollTop = previousTop + (container.scrollHeight - previousHeight);
    }
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
  } finally {
    loadingOlder.value = false;
  }
};

const handleMessagesScroll = () => {
  const container = messagesContainer.value;
  if (!container || loadingOlder.value || !historyCursor.value) {
    return;
  }

  if (container.scrollTop <= 80) {
    void loadOlderHistory();
  }
};

const ensureAutoStartedSession = async () => {
  if (
    autoStartAttempted.value ||
    !canUseChat.value ||
    busy.value
  ) {
    return;
  }

  autoStartAttempted.value = true;
  await loadChatHistory();

  if (!sessionId.value) {
    await handleStartSession();
  }
};

const retryAutoStart = async () => {
  autoStartAttempted.value = false;
  await ensureAutoStartedSession();
};

const handleSendMessage = async () => {
  const message = draftMessage.value.trim();

  if (!canUseChat.value || !sessionId.value || !message || busy.value) {
    return;
  }

  const traceId = createAiChatTraceId(sessionId.value);
  busy.value = true;
  errorMessage.value = "";
  draftMessage.value = "";
  messages.value.push({
    id: `${traceId}:user`,
    role: "user",
    content: message,
    recordedAt: new Date().toISOString(),
    traceId,
  });
  await scrollMessagesToBottom();

  try {
    const response = await sendAiChatMessage(
      {
        sessionId: sessionId.value,
        message,
        personality: personality.value,
        language: language.value,
        memoryEnabled: memoryEnabled.value,
      },
      traceId,
    );

    addAssistantMessage(response);
    await scrollMessagesToBottom();
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
  } finally {
    busy.value = false;
  }
};

const handleEndSession = async () => {
  if (!canUseChat.value || !sessionId.value || busy.value) {
    return;
  }

  const currentSessionId = sessionId.value;
  const traceId = createAiChatTraceId(currentSessionId);
  busy.value = true;
  errorMessage.value = "";

  try {
    await closeAiChatSession(currentSessionId, traceId);
    draftMessage.value = "";
    busy.value = false;
    await loadChatHistory();
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
  } finally {
    busy.value = false;
  }
};

const formatTime = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

onMounted(() => {
  restoreMemoryMode();
  void ensureAutoStartedSession();
});

watch(canUseChat, (value) => {
  if (value) {
    void ensureAutoStartedSession();
  }
});
</script>
