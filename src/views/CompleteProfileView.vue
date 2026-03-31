<template>
  <BaseLayout title="Complete Your Profile">
    <div class="container mx-auto px-8 py-12">
      <h1 class="text-3xl font-medium mb-2">Complete Your Lifeliner Profile</h1>
      <p class="text-gray-500 mb-8">
        Fill in your details to appear in the Lifeliners directory.
      </p>

      <div v-if="!auth.user" class="text-center py-16">
        <p class="text-gray-500">
          You must be signed in as a Lifeliner to access this page.
        </p>
        <a
          :href="loginUrl"
          class="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg font-medium"
        >
          Sign in with Google
        </a>
      </div>

      <div v-else-if="auth.user.role !== 'LIFELINER'" class="text-center py-16">
        <p class="text-gray-500">
          This page is only available to Lifeline volunteers.
        </p>
      </div>

      <div v-else-if="profileLoading" class="text-center py-16 text-gray-400">
        Loading profile…
      </div>

      <form v-else @submit.prevent="submitProfile" class="flex flex-col gap-5">
        <div
          v-if="apiError"
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
        >
          {{ apiError }}
        </div>

        <div
          v-if="success"
          class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
        >
          Profile saved successfully!
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm"
            >Full Name <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.full_name"
            type="text"
            required
            placeholder="Alexandra Martinez"
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm"
            >Display Name <span class="text-red-500">*</span></label
          >
          <p class="text-xs text-gray-500">
            This is what other users will see.
          </p>
          <input
            v-model="form.display_name"
            type="text"
            required
            placeholder="Alex M."
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm"
            >Age <span class="text-red-500">*</span></label
          >
          <input
            v-model.number="form.age"
            type="number"
            required
            min="18"
            max="120"
            placeholder="29"
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm"
            >Profile Picture <span class="text-red-500">*</span></label
          >
          <p class="text-xs text-gray-500">
            Public photo shown in the directory.
          </p>
          <div
            class="border-2 border-dashed rounded-lg p-4 flex flex-col items-center gap-3 cursor-pointer hover:border-primary transition-colors"
            @click="profilePictureInput?.click()"
            @dragover.prevent
            @drop.prevent="onDrop($event, 'profile')"
          >
            <img
              v-if="profilePreview"
              :src="profilePreview"
              class="w-24 h-24 rounded-full object-cover"
              alt="Profile preview"
            />
            <div
              v-else
              class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-10 h-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span class="text-sm text-gray-500">
              {{
                profileUploading
                  ? "Uploading…"
                  : profilePreview
                    ? "Click to change"
                    : "Click or drag to upload"
              }}
            </span>
            <input
              ref="profilePictureInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onFileChange($event, 'profile')"
            />
          </div>
          <p v-if="profileUploadError" class="text-xs text-red-500">
            {{ profileUploadError }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm"
            >Verification Photo <span class="text-red-500">*</span></label
          >
          <p class="text-xs text-gray-500">
            Private — used for verification only, never shown publicly.
          </p>
          <div
            class="border-2 border-dashed rounded-lg p-4 flex flex-col items-center gap-3 cursor-pointer hover:border-primary transition-colors"
            @click="privatePictureInput?.click()"
            @dragover.prevent
            @drop.prevent="onDrop($event, 'private')"
          >
            <img
              v-if="privatePreview"
              :src="privatePreview"
              class="w-24 h-24 rounded-full object-cover"
              alt="Verification photo preview"
            />
            <div
              v-else
              class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-10 h-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span class="text-sm text-gray-500">
              {{
                privateUploading
                  ? "Uploading…"
                  : privatePreview
                    ? "Click to change"
                    : "Click or drag to upload"
              }}
            </span>
            <input
              ref="privatePictureInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onFileChange($event, 'private')"
            />
          </div>
          <p v-if="privateUploadError" class="text-xs text-red-500">
            {{ privateUploadError }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-medium text-sm"
            >About Me <span class="text-red-500">*</span></label
          >
          <textarea
            v-model="form.about_me"
            required
            rows="4"
            placeholder="I'm a trained listener who loves supporting young adults through anxiety."
            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm"
            >Age Groups You Support <span class="text-red-500">*</span></label
          >
          <p class="text-xs text-gray-500">Select at least one.</p>
          <div class="flex flex-col gap-2">
            <label
              v-for="group in ageGroupOptions"
              :key="group.value"
              class="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                :value="group.value"
                v-model="form.age_groups"
                class="w-4 h-4 accent-primary"
              />
              <span>{{ group.label }}</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          :disabled="
            submitting ||
            profileUploading ||
            privateUploading ||
            form.age_groups.length === 0
          "
          class="mt-2 px-6 py-3 bg-primary text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ submitting ? "Saving…" : "Save Profile" }}
        </button>
      </form>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseLayout from "../layouts/BaseLayout.vue";
import { useAuthStore } from "../stores/auth";
import api, { loginUrl, API_BASE_URL } from "../lib/api";

const auth = useAuthStore();
const router = useRouter();

const ageGroupOptions = [
  { value: "TEENS", label: "Teens (13–17)" },
  { value: "YOUNG_ADULTS", label: "Young Adults (18–25)" },
  { value: "ADULTS", label: "Adults (26–64)" },
  { value: "SENIORS", label: "Seniors (65+)" },
];

const form = reactive({
  full_name: "",
  display_name: "",
  age: null as number | null,
  about_me: "",
  age_groups: [] as string[],
});

const submitting = ref(false);
const apiError = ref("");
const success = ref(false);
const profileLoading = ref(false);

onMounted(async () => {
  if (!auth.user || auth.user.role !== "LIFELINER") return;
  profileLoading.value = true;
  try {
    const res = await api.get("/lifeliners/me", { validateStatus: () => true });
    if (res.status === 200 && res.data) {
      const d = res.data;
      if (d.full_name) form.full_name = d.full_name;
      if (d.display_name) form.display_name = d.display_name;
      if (d.age) form.age = d.age;
      if (d.about_me) form.about_me = d.about_me;
      if (Array.isArray(d.age_groups)) form.age_groups = d.age_groups;
      if (d.profile_picture) {
        const url = d.profile_picture.startsWith("http")
          ? d.profile_picture
          : `${API_BASE_URL}${d.profile_picture}`;
        profilePreview.value = url;
        savedProfilePreview.value = url;
      }
      if (d.private_picture) {
        const url = d.private_picture.startsWith("http")
          ? d.private_picture
          : `${API_BASE_URL}${d.private_picture}`;
        privatePreview.value = url;
        savedPrivatePreview.value = url;
      }
    }
  } catch {
    // silently ignore — form stays empty
  } finally {
    profileLoading.value = false;
  }
});

// Photo upload state
const profilePictureInput = ref<HTMLInputElement | null>(null);
const privatePictureInput = ref<HTMLInputElement | null>(null);
const profilePreview = ref("");
const privatePreview = ref("");
const savedProfilePreview = ref("");
const savedPrivatePreview = ref("");
const profileUploading = ref(false);
const privateUploading = ref(false);
const profileUploadError = ref("");
const privateUploadError = ref("");

async function uploadFile(file: File, type: "profile" | "private") {
  const endpoint =
    type === "profile"
      ? "/lifeliners/upload/profile-picture"
      : "/lifeliners/upload/verification-photo";

  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    validateStatus: () => true,
  });

  if (res.status === 200 || res.status === 201) return;
  throw new Error(res.data?.message || "Upload failed");
}

async function onFileChange(event: Event, type: "profile" | "private") {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  await handleFile(file, type);
}

function onDrop(event: DragEvent, type: "profile" | "private") {
  const file = event.dataTransfer?.files?.[0];
  if (!file || !file.type.startsWith("image/")) return;
  handleFile(file, type);
}

async function handleFile(file: File, type: "profile" | "private") {
  const preview = URL.createObjectURL(file);

  if (type === "profile") {
    profilePreview.value = preview;
    profileUploading.value = true;
    profileUploadError.value = "";
    try {
      await uploadFile(file, type);
      savedProfilePreview.value = preview;
    } catch (e: any) {
      profileUploadError.value = e.message || "Upload failed. Try again.";
      profilePreview.value = savedProfilePreview.value;
    } finally {
      profileUploading.value = false;
    }
  } else {
    privatePreview.value = preview;
    privateUploading.value = true;
    privateUploadError.value = "";
    try {
      await uploadFile(file, type);
      savedPrivatePreview.value = preview;
    } catch (e: any) {
      privateUploadError.value = e.message || "Upload failed. Try again.";
      privatePreview.value = savedPrivatePreview.value;
    } finally {
      privateUploading.value = false;
    }
  }
}

async function submitProfile() {
  if (!profilePreview.value) {
    apiError.value = "Please upload a profile picture.";
    return;
  }
  if (!privatePreview.value) {
    apiError.value = "Please upload a verification photo.";
    return;
  }

  submitting.value = true;
  apiError.value = "";
  success.value = false;

  try {
    await api
      .patch("/lifeliners", form, { validateStatus: () => true })
      .then((res) => {
        if (res.status === 201) {
          success.value = true;
          router.push("/");
        } else if (res.status === 409) {
          apiError.value = "You already have a Lifeliner profile.";
        } else {
          const data = res.data;
          const messages = Array.isArray(data.message)
            ? data.message.join(", ")
            : data.message;
          apiError.value =
            messages || "Something went wrong. Please try again.";
        }
      });
  } catch {
    apiError.value =
      "Network error. Please check your connection and try again.";
  } finally {
    submitting.value = false;
  }
}
</script>
