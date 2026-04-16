<template>
  <BaseLayout title="AI Chat Dev">
    <div class="mx-auto max-w-6xl px-5 py-10">
      <div class="mb-6">
        <p
          class="text-sm font-semibold uppercase tracking-[0.2em] text-primary"
        >
          AI Companion Dev
        </p>
        <h1 class="mt-2 text-4xl font-semibold text-slate-900">
          Trackable AI chat for development
        </h1>
        <p class="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          This page keeps the detailed gateway status, audit trail, and local
          dev helpers for AI chat testing.
        </p>
      </div>

      <section
        class="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div
          class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
        >
          <div>
            <p class="text-sm font-medium text-slate-500">Real AI connection</p>
            <p
              class="mt-1 text-2xl font-semibold"
              :class="
                gatewayStatus?.reachable ? 'text-emerald-600' : 'text-slate-900'
              "
            >
              {{
                statusBusy
                  ? "Checking lifelines-ai..."
                  : gatewayStatus?.reachable
                    ? "Connected to lifelines-ai"
                    : "Waiting for upstream confirmation"
              }}
            </p>
            <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              {{
                gatewayStatus?.reachable
                  ? `The API gateway is using ${gatewayStatus.routes.messagePath} for live chat replies.`
                  : gatewayStatus?.errorMessage ||
                    "Check the gateway status to confirm the page is using the real AI endpoint."
              }}
            </p>
          </div>

          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="statusBusy"
            @click="loadGatewayStatus"
          >
            {{ statusBusy ? "Checking..." : "Refresh status" }}
          </button>
        </div>

        <div
          v-if="gatewayStatus"
          class="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-2 xl:grid-cols-4"
        >
          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Health path
            </p>
            <p class="mt-2 break-all font-medium">{{ gatewayStatus.health.path }}</p>
          </div>
          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Start session
            </p>
            <p class="mt-2 break-all font-medium">
              {{ gatewayStatus.routes.sessionStartPath }}
            </p>
          </div>
          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Send message
            </p>
            <p class="mt-2 break-all font-medium">
              {{ gatewayStatus.routes.messagePath }}
            </p>
          </div>
          <div class="rounded-2xl bg-slate-50 px-4 py-3">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Close session
            </p>
            <p class="mt-2 break-all font-medium">
              {{ gatewayStatus.routes.sessionClosePath }}
            </p>
          </div>
        </div>
      </section>

      <div class="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <section
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div
            class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
          >
            <div>
              <p class="text-sm font-medium text-slate-500">Current status</p>
              <p class="mt-1 text-2xl font-semibold text-slate-900">
                {{ sessionId ? "Session active" : "Ready to start" }}
              </p>
              <p class="mt-2 text-sm text-slate-600">
                {{
                  sessionId
                    ? `Session ID: ${sessionId}`
                    : "Start a session to receive the opening AI message."
                }}
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <button
                v-if="canUseChat && !sessionId"
                type="button"
                class="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="busy"
                @click="handleStartSession"
              >
                {{ busy ? "Starting..." : "Start AI chat" }}
              </button>
              <button
                v-if="canUseChat && sessionId"
                type="button"
                class="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="busy"
                @click="handleEndSession"
              >
                {{ busy ? "Working..." : "End session" }}
              </button>
            </div>
          </div>

          <div
            v-if="!canUseChat"
            class="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"
          >
            <p class="text-lg font-semibold">Sign in to use AI chat</p>
            <p class="mt-2 text-sm leading-6">
              The web chat currently runs behind authenticated API routes so we
              can attribute usage and keep the audit trail tied to a real user.
            </p>
            <RouterLink
              to="/signin"
              class="mt-4 inline-flex rounded-full bg-amber-950 px-5 py-2.5 text-sm font-semibold text-white no-underline! transition hover:opacity-90"
            >
              Go to sign in
            </RouterLink>
          </div>

          <div v-else class="mt-6 space-y-5">
            <div
              v-if="devMode && !auth.user"
              class="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900"
            >
              Local dev mode is active, so you can test AI chat without signing
              in first.
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <label class="block">
                <span class="text-sm font-medium text-slate-700"
                  >Personality</span
                >
                <select
                  v-model.number="personality"
                  class="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white"
                  :disabled="busy"
                >
                  <option :value="1">Friend</option>
                  <option :value="2">Sibling</option>
                  <option :value="3">Coach</option>
                </select>
              </label>

              <label class="block">
                <span class="text-sm font-medium text-slate-700">Language</span>
                <select
                  v-model="language"
                  class="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white"
                  :disabled="busy"
                >
                  <option value="en">English</option>
                  <option value="ind">Bahasa Indonesia</option>
                </select>
              </label>
            </div>

            <div
              v-if="errorMessage"
              class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              {{ errorMessage }}
            </div>

            <div
              ref="messagesContainer"
              class="flex min-h-[420px] flex-col gap-4 overflow-y-auto rounded-[28px] border border-slate-200 bg-slate-50 p-4"
            >
              <div
                v-if="messages.length === 0"
                class="flex h-full min-h-[340px] items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white/70 px-6 text-center text-sm leading-7 text-slate-500"
              >
                Start the session to get the first AI response, then keep the
                conversation going from here.
              </div>

              <article
                v-for="message in messages"
                :key="message.id"
                class="max-w-[85%] rounded-[24px] px-4 py-3 shadow-sm"
                :class="
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-white'
                    : 'bg-white text-slate-900'
                "
              >
                <div
                  class="flex items-center justify-between gap-3 text-xs opacity-80"
                >
                  <span class="font-semibold">
                    {{ message.role === "user" ? "You" : "LifeLines AI" }}
                  </span>
                  <span>{{ formatTimestamp(message.recordedAt) }}</span>
                </div>
                <p class="mt-2 whitespace-pre-wrap text-sm leading-6">
                  {{ message.content }}
                </p>
                <div
                  v-if="message.role === 'assistant' && message.tokenUsage"
                  class="mt-3 flex flex-wrap gap-2 text-[11px] opacity-75"
                >
                  <span
                    class="rounded-full bg-slate-100 px-2 py-1 text-slate-700"
                  >
                    In: {{ message.tokenUsage.totalInput }}
                  </span>
                  <span
                    class="rounded-full bg-slate-100 px-2 py-1 text-slate-700"
                  >
                    Out: {{ message.tokenUsage.totalOutput }}
                  </span>
                </div>
                <p class="mt-3 break-all text-[11px] opacity-60">
                  Trace: {{ message.traceId }}
                </p>
              </article>

              <div
                v-if="busy"
                class="max-w-[85%] rounded-[24px] bg-white px-4 py-3 text-sm text-slate-500 shadow-sm"
              >
                LifeLines AI is thinking...
              </div>
            </div>

            <form class="space-y-3" @submit.prevent="handleSendMessage">
              <textarea
                v-model="draftMessage"
                rows="4"
                class="w-full rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Type your message here..."
                :disabled="busy || !sessionId || !canUseChat"
              />

              <div
                class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <p class="text-xs leading-5 text-slate-500">
                  Every request sends an `X-Trace-Id` header and gets mirrored
                  in the audit log on this page.
                </p>
                <button
                  type="submit"
                  class="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  :disabled="
                    busy || !sessionId || !draftMessage.trim() || !canUseChat
                  "
                >
                  {{ busy ? "Sending..." : "Send message" }}
                </button>
              </div>
            </form>
          </div>
        </section>

        <aside class="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
          <p
            class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
          >
            Audit trail
          </p>
          <h2 class="mt-2 text-2xl font-semibold">What happened</h2>
          <p class="mt-3 text-sm leading-6 text-slate-300">
            This panel makes each chat action visible while the API and AI
            service also write matching structured logs server-side.
          </p>

          <div class="mt-6 space-y-3">
            <div class="rounded-2xl bg-white/5 p-4">
              <p class="text-xs uppercase tracking-[0.16em] text-slate-400">
                Active session
              </p>
              <p class="mt-2 break-all text-sm text-white">
                {{ sessionId || "Not started yet" }}
              </p>
            </div>

            <div class="rounded-2xl bg-white/5 p-4">
              <p class="text-xs uppercase tracking-[0.16em] text-slate-400">
                Last trace id
              </p>
              <p class="mt-2 break-all text-sm text-white">
                {{ lastTraceId || "No requests sent yet" }}
              </p>
            </div>
          </div>

          <div class="mt-6 max-h-[520px] space-y-3 overflow-y-auto pr-1">
            <div
              v-if="auditTrail.length === 0"
              class="rounded-2xl border border-dashed border-white/15 px-4 py-5 text-sm leading-6 text-slate-400"
            >
              No audit entries yet. Start a session and send a message to see
              the event stream.
            </div>

            <article
              v-for="entry in auditTrail"
              :key="entry.id"
              class="rounded-2xl bg-white/5 p-4"
            >
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-semibold text-white">
                  {{ entry.event }}
                </p>
                <span
                  class="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                  :class="statusClass(entry.status)"
                >
                  {{ entry.status }}
                </span>
              </div>
              <p class="mt-2 text-xs text-slate-400">
                {{ formatTimestamp(entry.recordedAt) }}
              </p>
              <p class="mt-3 break-all text-xs text-slate-300">
                {{ entry.traceId }}
              </p>
              <p
                v-if="entry.summary"
                class="mt-3 text-sm leading-6 text-slate-200"
              >
                {{ entry.summary }}
              </p>
            </article>
          </div>
        </aside>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import {
  closeAiChatSession,
  createAiChatTraceId,
  getAiChatStatus,
  isAiChatDevModeEnabled,
  sendAiChatMessage,
  startAiChatSession,
  type AiChatLanguage,
  type AiChatStatusResponse,
  type AiChatTurnResponse,
} from "../lib/aiChat";
import { useAuthStore } from "../stores/auth";

type AuditStatus = "info" | "success" | "error";

type AuditEntry = {
  id: string;
  event: string;
  traceId: string;
  recordedAt: string;
  status: AuditStatus;
  summary?: string;
};

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
const auditTrail = ref<AuditEntry[]>([]);
const messagesContainer = ref<HTMLElement | null>(null);
const sessionId = ref<string | null>(null);
const draftMessage = ref("");
const errorMessage = ref("");
const lastTraceId = ref("");
const gatewayStatus = ref<AiChatStatusResponse | null>(null);
const busy = ref(false);
const statusBusy = ref(false);
const personality = ref(1);
const language = ref<AiChatLanguage>("en");
const devMode = computed(() => isAiChatDevModeEnabled());
const canUseChat = computed(() => Boolean(auth.user) || devMode.value);

const addAuditEntry = (
  event: string,
  traceId: string,
  status: AuditStatus,
  summary?: string,
) => {
  auditTrail.value.unshift({
    id: createAiChatTraceId(traceId),
    event,
    traceId,
    recordedAt: new Date().toISOString(),
    status,
    summary,
  });
  lastTraceId.value = traceId;
};

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

const loadGatewayStatus = async () => {
  const traceId = createAiChatTraceId("status");
  statusBusy.value = true;
  addAuditEntry(
    "web.ai_chat.status.requested",
    traceId,
    "info",
    "Checking whether the API gateway is connected to the real lifelines-ai service.",
  );

  try {
    const response = await getAiChatStatus(traceId);
    gatewayStatus.value = response;
    addAuditEntry(
      response.reachable
        ? "web.ai_chat.status.completed"
        : "web.ai_chat.status.failed",
      response.traceId,
      response.reachable ? "success" : "error",
      response.reachable
        ? `Gateway confirmed live AI routing through ${response.routes.messagePath}.`
        : response.errorMessage ||
            "The API gateway could not reach lifelines-ai.",
    );
  } catch (error) {
    const message = getErrorMessage(error);
    addAuditEntry("web.ai_chat.status.failed", traceId, "error", message);
  } finally {
    statusBusy.value = false;
  }
};

const handleStartSession = async () => {
  if (!canUseChat.value || busy.value) {
    return;
  }

  const traceId = createAiChatTraceId(sessionId.value ?? undefined);
  busy.value = true;
  errorMessage.value = "";
  messages.value = [];
  addAuditEntry(
    "web.ai_chat.session_start.requested",
    traceId,
    "info",
    `Starting AI chat with personality ${personality.value} in ${language.value}.`,
  );

  try {
    const response = await startAiChatSession(
      {
        personality: personality.value,
        language: language.value,
      },
      traceId,
    );

    sessionId.value = response.sessionId;
    addAssistantMessage(response);
    addAuditEntry(
      "web.ai_chat.session_start.completed",
      response.traceId,
      "success",
      `Session ${response.sessionId} opened and greeting received.`,
    );
    await scrollMessagesToBottom();
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
    addAuditEntry(
      "web.ai_chat.session_start.failed",
      traceId,
      "error",
      errorMessage.value,
    );
  } finally {
    busy.value = false;
  }
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
  addAuditEntry(
    "web.ai_chat.message.requested",
    traceId,
    "info",
    `Sending ${message.length} characters to the API gateway.`,
  );
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
    addAuditEntry(
      "web.ai_chat.message.completed",
      response.traceId,
      "success",
      `Reply received with ${response.tokenUsage.totalInput} input and ${response.tokenUsage.totalOutput} output tokens.`,
    );
    await scrollMessagesToBottom();
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
    addAuditEntry(
      "web.ai_chat.message.failed",
      traceId,
      "error",
      errorMessage.value,
    );
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
  addAuditEntry(
    "web.ai_chat.session_close.requested",
    traceId,
    "info",
    `Closing session ${currentSessionId}.`,
  );

  try {
    const response = await closeAiChatSession(currentSessionId, traceId);
    sessionId.value = null;
    addAuditEntry(
      "web.ai_chat.session_close.completed",
      response.traceId,
      "success",
      `Session ${response.sessionId} closed.`,
    );
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
    addAuditEntry(
      "web.ai_chat.session_close.failed",
      traceId,
      "error",
      errorMessage.value,
    );
  } finally {
    busy.value = false;
  }
};

const formatTimestamp = (value: string) =>
  new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const statusClass = (status: AuditStatus) => {
  if (status === "success") {
    return "bg-emerald-500/15 text-emerald-200";
  }

  if (status === "error") {
    return "bg-rose-500/15 text-rose-200";
  }

  return "bg-sky-500/15 text-sky-200";
};

onMounted(() => {
  void loadGatewayStatus();
});
</script>
