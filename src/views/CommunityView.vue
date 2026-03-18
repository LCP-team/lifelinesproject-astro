<template>
  <BaseLayout title="Community">
    <div class="md:px-auto z-10 relative">
      <img src="/images/uncompressed/cup2.webp" class="w-full h-auto" />
      <div class="container mx-auto px-8 max-w-[1300px]">
        <h1 class="text-3xl mt-10 font-medium">Join Our Community</h1>
        <h2 class="text-xl font-light mb-5">
          LifeLines is creating a
          <b>private Canadians Abroad community forum</b> on the LifeLines
          platform — a place where Canadians living overseas can connect, share
          experiences, and support one another while navigating life abroad.
        </h2>

        <div class="flex flex-col gap-4 text-lg mb-10">
          <p>
            Living in another country can bring many questions and adjustments.
            This community is designed for <b>everyday peer connection</b>:
            asking practical questions, learning how to navigate local systems,
            sharing experiences, and connecting with other Canadians who
            understand what it's like to live abroad.
          </p>
          <p>
            While the community is a place for conversation and mutual support,
            it is <b>not a counselling or crisis service</b>. Instead, it is a
            respectful peer space built on shared experience.
          </p>
          <p>
            To help everyone feel comfortable participating, the forum will be
            <b>moderated and guided by clear community guidelines</b> to
            encourage respectful, supportive, and constructive conversations.
          </p>
          <p>
            Your <b>privacy is important to us</b>. Only your
            <b>screen name will be visible</b> to other members in the forum.
            You can create an account using <b>email and password</b>, or sign
            up using your <b>Google account</b>, and begin participating in the
            community right away.
          </p>
          <p>
            If you are a Canadian living abroad,
            <b
              >we welcome you to join the community and connect with others who
              share the experience of living outside Canada</b
            >.
          </p>
          <p>
            If you ever have concerns about the community, wish to report an
            issue, or need assistance, you can contact us confidentially at:
          </p>
          <a href="mailto:support@lifelinesproject.com" class="text-primary">
            support@lifelinesproject.com
          </a>
          <p>
            We are committed to maintaining a community built on trust, care,
            and respect for Canadians living abroad.
          </p>
        </div>
        <NonProfit />
      </div>
      <img src="/images/uncompressed/woman.webp" class="w-full h-auto" />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "../layouts/BaseLayout.vue";
import NonProfit from "../components/NonProfit.vue";
</script>
