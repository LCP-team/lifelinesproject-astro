<template>
  <BaseLayout title="Privacy Policy">
    <div class="container px-6 md:px-32 lg:px-64 mx-auto py-12">
      <h1 class="text-3xl font-medium mb-2">Privacy Policy</h1>
      <p class="text-sm text-gray-500 mb-10">Last updated: March 19, 2026</p>

      <div class="flex flex-col gap-8 text-base leading-relaxed">
        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">1. About This Policy</h2>
          <p>
            LifeLines Canada ("<b>LifeLines</b>", "<b>we</b>", "<b>us</b>", or
            "<b>our</b>") is a non-profit project dedicated to supporting
            Canadians living abroad. This Privacy Policy explains how we
            collect, use, store, and protect your personal information when you
            use our website and services at <b>lifelinesproject.com</b>.
          </p>
          <p>
            By using LifeLines, you agree to the practices described in this
            policy. If you do not agree, please do not use our services.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">2. Information We Collect</h2>

          <p class="font-semibold">2.1 Information You Provide</p>
          <ul class="list-disc list-outside pl-6 flex flex-col gap-2">
            <li>
              <b>Account information:</b> When you sign in with Google, we
              receive your name and email address from Google. We do not receive
              or store your Google password.
            </li>
            <li>
              <b>Lifeliner profile:</b> If you register as a Lifeliner
              volunteer, you provide a display name, age, a public profile
              photo, a private verification photo, an about-me bio, and the age
              groups you support.
            </li>
            <li>
              <b>Communications:</b> If you contact us at
              support@lifelinesproject.com, we retain that correspondence.
            </li>
          </ul>

          <p class="font-semibold mt-2">
            2.2 Information Collected Automatically
          </p>
          <ul class="list-disc list-outside pl-6 flex flex-col gap-2">
            <li>
              <b>Authentication token:</b> After sign-in we store a JWT (JSON
              Web Token) in a browser cookie named
              <code class="bg-gray-100 px-1 rounded text-sm"
                >lifelines_token</code
              >. This cookie is used solely to keep you signed in and expires
              after 30 days.
            </li>
            <li>
              <b>Usage data:</b> We use Vercel Analytics and Speed Insights to
              collect anonymised data about page visits and performance. This
              data does not identify you personally.
            </li>
          </ul>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul class="list-disc list-outside pl-6 flex flex-col gap-2">
            <li>
              Create and maintain your account and authenticate your identity.
            </li>
            <li>
              Display your Lifeliner profile in our volunteer directory (public
              fields only).
            </li>
            <li>
              Verify Lifeliner identity using the private verification photo
              (never shown publicly).
            </li>
            <li>Respond to enquiries sent to our support email.</li>
            <li>Improve the performance and reliability of our platform.</li>
            <li>
              Comply with applicable laws and protect the safety of our
              community.
            </li>
          </ul>
          <p>
            We do <b>not</b> sell, rent, or share your personal information with
            third parties for marketing purposes.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">4. Public vs. Private Information</h2>
          <p>
            We carefully distinguish between information that is publicly
            visible and information that remains private:
          </p>
          <div class="overflow-x-auto">
            <table
              class="w-full text-sm border border-gray-200 rounded-lg overflow-hidden"
            >
              <thead class="bg-gray-50 text-left">
                <tr>
                  <th class="px-4 py-3 font-semibold border-b border-gray-200">
                    Field
                  </th>
                  <th class="px-4 py-3 font-semibold border-b border-gray-200">
                    Visibility
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr>
                  <td class="px-4 py-3">Display name</td>
                  <td class="px-4 py-3 text-green-700">
                    Public — shown in directory
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3">Age</td>
                  <td class="px-4 py-3 text-green-700">
                    Public — shown in directory
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3">Profile photo</td>
                  <td class="px-4 py-3 text-green-700">
                    Public — shown in directory
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3">About me</td>
                  <td class="px-4 py-3 text-green-700">
                    Public — shown in directory
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3">Age groups supported</td>
                  <td class="px-4 py-3 text-green-700">
                    Public — shown in directory
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3">Full name</td>
                  <td class="px-4 py-3 text-red-700">
                    Private — never shown publicly
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3">Verification photo</td>
                  <td class="px-4 py-3 text-red-700">
                    Private — for verification only
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3">Email address</td>
                  <td class="px-4 py-3 text-red-700">
                    Private — never shown publicly
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">5. Cookies</h2>
          <p>
            We use a single authentication cookie (<code
              class="bg-gray-100 px-1 rounded text-sm"
              >lifelines_token</code
            >) to keep you signed in. This is a functional cookie — without it,
            authentication cannot work.
          </p>
          <p>
            Third-party scripts (Vercel Analytics, Vercel Speed Insights, Google
            Identity Services) may also set their own cookies or use local
            storage. These are governed by the respective privacy policies of
            Google and Vercel.
          </p>
          <p>
            You can remove all cookies by signing out or clearing your browser
            data. Disabling cookies will prevent you from staying signed in.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">6. Data Retention</h2>
          <ul class="list-disc list-outside pl-6 flex flex-col gap-2">
            <li>
              Your account data is retained for as long as your account exists.
            </li>
            <li>
              Lifeliner profile data is retained until you delete your profile.
            </li>
            <li>
              Analytics data is retained according to Vercel's data retention
              policies.
            </li>
            <li>
              You may request deletion of your account and all associated data
              by emailing us at
              <a href="mailto:support@lifelinesproject.com" class="text-primary"
                >support@lifelinesproject.com</a
              >. We will process your request within 30 days.
            </li>
          </ul>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">7. Third-Party Services</h2>
          <p>LifeLines uses the following third-party services:</p>
          <ul class="list-disc list-outside pl-6 flex flex-col gap-2">
            <li>
              <b>Google Identity Services</b> — for authentication. Subject to
              Google's Privacy Policy.
            </li>
            <li>
              <b>Vercel</b> — for hosting and analytics. Subject to Vercel's
              Privacy Policy.
            </li>
          </ul>
          <p>
            We are not responsible for the privacy practices of these third
            parties. We encourage you to review their policies.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul class="list-disc list-outside pl-6 flex flex-col gap-2">
            <li><b>Access</b> the personal information we hold about you.</li>
            <li><b>Correct</b> inaccurate information in your profile.</li>
            <li><b>Delete</b> your account and associated personal data.</li>
            <li>
              <b>Withdraw consent</b> at any time by signing out and requesting
              account deletion.
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at
            <a href="mailto:support@lifelinesproject.com" class="text-primary"
              >support@lifelinesproject.com</a
            >.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">9. Children's Privacy</h2>
          <p>
            LifeLines services, including the Lifeliner directory and community
            forum, are intended for users aged 13 and older. Lifeliner
            volunteers must be at least 18 years old. We do not knowingly
            collect personal information from children under 13. If you believe
            a child under 13 has provided us with personal information, please
            contact us immediately.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will revise the "Last updated" date at the top of this page.
            Continued use of LifeLines after changes are posted constitutes your
            acceptance of the updated policy.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">11. Contact Us</h2>
          <p>
            For any questions, concerns, or requests related to this Privacy
            Policy, please contact us at:
          </p>
          <p>
            <b>LifeLines Canada</b><br />
            <a href="mailto:support@lifelinesproject.com" class="text-primary"
              >support@lifelinesproject.com</a
            >
          </p>
        </section>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "../layouts/BaseLayout.vue";
import { useCacheControl } from "../composables/useCacheControl";

useCacheControl("public, s-maxage=86400, stale-while-revalidate=604800");
</script>
