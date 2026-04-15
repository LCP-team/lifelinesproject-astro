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

              <div
                v-if="errorMessage"
                class="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              >
                {{ errorMessage }}
              </div>
            </div>

            <div
              ref="messagesContainer"
              class="flex min-h-[520px] max-h-[62vh] flex-col gap-4 overflow-y-auto bg-[linear-gradient(180deg,rgba(241,245,249,0.55),rgba(255,255,255,0.95))] px-4 py-6 sm:px-6"
            >
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

              <article
                v-for="message in messages"
                :key="message.id"
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
  createAiChatTraceId,
  isAiChatDevModeEnabled,
  sendAiChatMessage,
  startAiChatSession,
  type AiChatLanguage,
  type AiChatTurnResponse,
} from "../lib/aiChat";
import { useAuthStore } from "../stores/auth";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  recordedAt: string;
  traceId: string;
  tokenUsage?: AiChatTurnResponse["tokenUsage"];
};

const auth = useAuthStore();
const messages = ref<ChatMessage[]>([]);
const messagesContainer = ref<HTMLElement | null>(null);
const sessionId = ref<string | null>(null);
const draftMessage = ref("");
const errorMessage = ref("");
const busy = ref(false);
const autoStartAttempted = ref(false);
const personality = ref(1);
const language = ref<AiChatLanguage>("en");
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

const handleStartSession = async () => {
  if (!canUseChat.value || busy.value || sessionId.value) {
    return;
  }

  const traceId = createAiChatTraceId("session");
  busy.value = true;
  errorMessage.value = "";
  messages.value = [];

  try {
    const response = await startAiChatSession(
      {
        message: "<init>",
        personality: personality.value,
        language: language.value,
      },
      traceId,
    );

    sessionId.value = response.sessionId;
    addAssistantMessage(response);
    await scrollMessagesToBottom();
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
  } finally {
    busy.value = false;
  }
};

const ensureAutoStartedSession = async () => {
  if (
    autoStartAttempted.value ||
    !canUseChat.value ||
    sessionId.value ||
    busy.value
  ) {
    return;
  }

  autoStartAttempted.value = true;
  await handleStartSession();
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
    sessionId.value = null;
    messages.value = [];
    draftMessage.value = "";
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
  void ensureAutoStartedSession();
});

watch(canUseChat, (value) => {
  if (value) {
    void ensureAutoStartedSession();
  }
});
</script>
