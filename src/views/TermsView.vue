<template>
  <BaseLayout title="Terms of Use">
    <div class="container px-6 md:px-32 lg:px-64 mx-auto py-12 max-w-[900px]">
      <h1 class="text-3xl font-medium mb-2">Terms of Use</h1>
      <p class="text-sm text-gray-500 mb-10">Last updated: March 19, 2026</p>

      <div class="flex flex-col gap-8 text-base leading-relaxed">

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the LifeLines Canada platform ("<b>LifeLines</b>", "<b>we</b>",
            "<b>us</b>", or "<b>our</b>") at <b>lifelinesproject.com</b>, you agree to be bound by these
            Terms of Use ("<b>Terms</b>"). If you do not agree to these Terms, you must not use our services.
          </p>
          <p>
            LifeLines Canada is a non-profit project. Use of our platform is free of charge. These Terms
            apply to all visitors, users, and volunteers.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">2. Description of Services</h2>
          <p>LifeLines Canada provides the following services to support Canadians living abroad:</p>
          <ul class="list-disc list-outside pl-6 flex flex-col gap-2">
            <li><b>Crisis Resource Directory</b> — a public directory of crisis and mental health support services organized by country.</li>
            <li><b>Lifeliner Directory</b> — a directory of trained Canadian volunteer peer supporters available to connect with Canadians abroad.</li>
            <li><b>Community Forum</b> — a moderated peer community for Canadians living outside Canada to connect and support one another.</li>
          </ul>
          <p>
            LifeLines is <b>not a crisis service</b>, a registered mental health provider, or a substitute
            for professional medical or psychological care. In an emergency, please contact your local
            emergency services.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">3. Eligibility</h2>
          <ul class="list-disc list-outside pl-6 flex flex-col gap-2">
            <li>You must be at least <b>13 years of age</b> to use LifeLines.</li>
            <li>To register as a <b>Lifeliner volunteer</b>, you must be at least <b>18 years of age</b>.</li>
            <li>
              You must provide accurate, truthful information when creating an account or a Lifeliner profile.
              Creating false or misleading profiles is strictly prohibited.
            </li>
          </ul>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">4. Accounts and Authentication</h2>
          <p>
            LifeLines uses Google Sign-In to authenticate users. By signing in, you authorize LifeLines to
            receive your name and email address from Google for the purpose of creating and maintaining your
            account.
          </p>
          <ul class="list-disc list-outside pl-6 flex flex-col gap-2">
            <li>You are responsible for maintaining the confidentiality of your session and for all activity that occurs under your account.</li>
            <li>You must notify us immediately at <a href="mailto:support@lifelinesproject.com" class="text-primary">support@lifelinesproject.com</a> if you suspect unauthorized use of your account.</li>
            <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
          </ul>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">5. Lifeliner Volunteers</h2>
          <p>
            Lifeliners are volunteer peer supporters — they are <b>not licensed therapists, counsellors, or
            mental health professionals</b> unless otherwise indicated. Their role is compassionate peer
            listening and supportive conversation.
          </p>
          <p>If you register as a Lifeliner, you agree to:</p>
          <ul class="list-disc list-outside pl-6 flex flex-col gap-2">
            <li>Provide accurate information in your profile, including a valid verification photo.</li>
            <li>Engage with clients respectfully, compassionately, and within the boundaries of peer support.</li>
            <li>Not represent yourself as a licensed mental health professional unless you are one.</li>
            <li>Refer individuals to emergency services or professional help when appropriate.</li>
            <li>Comply with any training, guidelines, or code of conduct provided by LifeLines.</li>
          </ul>
          <p>
            LifeLines reserves the right to remove any Lifeliner profile that does not meet our standards
            or that violates these Terms.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">6. Community Guidelines</h2>
          <p>When using the LifeLines community forum or any interactive features, you agree to:</p>
          <ul class="list-disc list-outside pl-6 flex flex-col gap-2">
            <li>Treat all members with respect, dignity, and empathy.</li>
            <li>Not post content that is abusive, threatening, harassing, discriminatory, or harmful.</li>
            <li>Not share content that glorifies or promotes self-harm or suicide.</li>
            <li>Not impersonate another person or misrepresent your affiliation.</li>
            <li>Not share private or confidential information about another member without their consent.</li>
            <li>Not use the platform for commercial solicitation, spam, or advertising.</li>
          </ul>
          <p>
            LifeLines moderates community spaces to maintain a safe environment. We may remove content or
            suspend accounts that violate these guidelines, at our sole discretion.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">7. Not a Crisis or Medical Service</h2>
          <div class="bg-yellow-50 border border-yellow-300 rounded-lg px-5 py-4 flex flex-col gap-2">
            <p class="font-semibold">Important Notice</p>
            <p>
              LifeLines Canada does <b>not provide crisis intervention, emergency mental health services, or
              professional counselling</b>. If you or someone you know is in immediate danger or experiencing
              a mental health crisis, please:
            </p>
            <ul class="list-disc list-outside pl-6">
              <li>Contact your <b>local emergency services</b> (e.g., 911 or your country's equivalent).</li>
              <li>Contact a <b>local crisis line</b> in the country where you are located.</li>
              <li>Visit our <RouterLink to="/crisishotline" class="text-primary">Crisis Hotline Directory</RouterLink> for resources by country.</li>
            </ul>
          </div>
          <p>
            LifeLines and its volunteers are not liable for outcomes resulting from conversations or
            interactions on the platform. Peer support is not a substitute for professional care.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">8. Intellectual Property</h2>
          <p>
            All content on lifelinesproject.com — including text, images, logos, and design — is the
            property of LifeLines Canada or its content contributors and is protected by applicable
            copyright laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, or create derivative works from our content without
            prior written permission. Personal, non-commercial use of our crisis resource directory is
            permitted.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">9. Disclaimer of Warranties</h2>
          <p>
            LifeLines Canada is provided "<b>as is</b>" and "<b>as available</b>" without any warranties of
            any kind, express or implied. We do not warrant that the platform will be uninterrupted,
            error-free, or free of harmful components.
          </p>
          <p>
            We do not guarantee the accuracy, completeness, or currentness of crisis resource information
            listed in our directory, though we make reasonable efforts to keep it up to date.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">10. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, LifeLines Canada, its founders, volunteers, and
            contributors shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of, or inability to use, the platform or its services.
          </p>
          <p>
            Our total liability for any claim arising from these Terms or your use of LifeLines shall not
            exceed the amount you paid to use the service (which, as a free service, is nil).
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">11. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to LifeLines at any time, without
            notice, for conduct that we believe violates these Terms, is harmful to other users, or is
            otherwise harmful to LifeLines Canada.
          </p>
          <p>
            You may close your account at any time by contacting us at
            <a href="mailto:support@lifelinesproject.com" class="text-primary">support@lifelinesproject.com</a>.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">12. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. When we do, we will update the "Last updated"
            date at the top of this page. Your continued use of LifeLines after any changes constitutes
            your acceptance of the revised Terms.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">13. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Province of British Columbia and the federal laws
            of Canada applicable therein, without regard to conflict of law principles.
          </p>
        </section>

        <div class="border-t border-gray-200"></div>

        <section class="flex flex-col gap-3">
          <h2 class="text-xl font-bold">14. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <p>
            <b>LifeLines Canada</b><br />
            <a href="mailto:support@lifelinesproject.com" class="text-primary">support@lifelinesproject.com</a>
          </p>
        </section>

      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '../layouts/BaseLayout.vue'
import { useCacheControl } from '../composables/useCacheControl'

useCacheControl('public, s-maxage=86400, stale-while-revalidate=604800')
</script>
