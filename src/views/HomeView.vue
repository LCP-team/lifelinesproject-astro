<template>
  <BaseLayout title="Canada Abroad">
    <div class="relative">
      <div class="h-screen overflow-hidden relative z-0">
        <div class="bg-gray-950 opacity-50 absolute w-full h-full z-10"></div>
        <img
          src="/images/uncompressed/flag.webp"
          class="w-auto h-full lg:w-full lg:h-auto object-cover absolute xl:-top-40 z-0 transform scale-x-[-1]"
        />
        <div
          class="grid grid-cols-1 lg:grid-cols-2 w-full h-full relative z-20"
        >
          <div
            class="flex flex-col gap-2 justify-center items-left lg:pl-20 px-5 text-white text-sm md:text-md xl:text-lg text-shadow-lg"
          >
            <p class="text-3xl font-bold">LifeLines Canada</p>
            <p class="text-xl font-bold mb-5">
              Support and connection for Canadians abroad
            </p>
            <p>
              An estimated 2.7 million Canadians live outside Canada: nearly 1
              in 10 citizens.
            </p>
            <p>
              Living abroad can be exciting, meaningful, and full of
              opportunity. But it can also come with unexpected challenges. Many
              Canadians experience moments of loneliness, culture shock,
              personal struggles, or emotional crisis while living far from
              home.
            </p>
            <p>
              When those moments happen, the distance from family, friends, and
              familiar support systems can make everything feel heavier.
            </p>
            <p>
              And when you're outside Canada, it's not always clear where to
              turn for help.
            </p>
            <p>
              <strong>
                LifeLines Canada exists so Canadians abroad never have to face
                those moments alone.
              </strong>
            </p>
            <div class="flex flex-col md:flex-row gap-4 mt-10 text-center">
              <RouterLink
                to="/crisishotline"
                class="no-underline! px-5 py-2 bg-white rounded-xl text-gray-900 font-medium"
                >Find Crisis Support</RouterLink
              >
              <RouterLink
                to="/community"
                class="no-underline! px-5 py-2 bg-white rounded-xl text-gray-900 font-medium"
                >Join the Community</RouterLink
              >
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div class="w-full container mx-auto px-5 md:px-32 xl:px-64 py-20">
        <p class="text-3xl font-medium mb-3">
          How LifeLines Supports Canadians Abroad
        </p>

        <p class="text-lg mb-3">
          LifeLines Canada provides three ways for Canadians living abroad to
          find support, connection, and helpful resources.
        </p>

        <ol class="list-decimal list-outside pl-8 [&>li]:mb-3">
          <li class="space-y-3 text-lg">
            <p class="font-medium text-2xl mt-5">
              The LifeLiner Peer Support Program
            </p>
            <div class="space-y-1 text-md">
              <p>
                <b>One-on-one support from compassionate Canadian volunteers</b>
              </p>
              <p>
                At the heart of LifeLines is the
                <b>LifeLiner Peer Support Program</b>.
              </p>
              <p>
                LifeLiners are trained Canadian volunteers who offer
                <b>free one-on-one peer support through active listening</b> for
                Canadians living abroad.
              </p>
              <p>
                LifeLiners are <b>not therapists or counselors</b>. <br />
                They are peers offering something deeply human and powerful:
              </p>
              <ul class="list-disc list-outside pl-8">
                <li>Someone who listens</li>
                <li>Someone who understands</li>
                <li>Someone who reminds you that you are not alone</li>
              </ul>
              <p>
                Sometimes what people need most is simply
                <b>a safe space to talk with someone who genuinely cares</b>.
              </p>

              <p class="mt-5 text-lg">What is Active Listening?</p>
              <p>
                Active listening is a supportive communication approach where
                the listener focuses fully on understanding the person speaking,
                without judgment, interruption, or trying to "fix" the problem.
              </p>
              <p>A LifeLiner will:</p>
              <ul class="list-disc list-outside pl-8">
                <li>Listen with full attention</li>
                <li>Acknowledge and validate your feelings</li>
                <li>Reflect back what they hear so you feel understood</li>
                <li>Create a safe and supportive conversation</li>
              </ul>
              <p>
                Research in peer-support programs shows that
                <b
                  >empathetic listening and peer connection can reduce feelings
                  of isolation and emotional distress</b
                >, while helping people regain a sense of stability and hope.
              </p>
              <p>
                Sometimes the most powerful support is simply
                <b>being heard</b>.
              </p>

              <p class="mt-5 text-lg">How the LifeLiner Program Works</p>
              <div class="pl-3">
                <p class="font-bold">Browse LifeLiners</p>
                <p>
                  Canadians abroad can browse the LifeLiner directory on the
                  LifeLines platform. Each LifeLiner has a profile where you can
                  learn about them and the areas they feel comfortable
                  supporting.
                </p>
                <p class="font-bold">Request a Conversation</p>
                <p>
                  Once you find a LifeLiner you'd like to talk with, you can
                  send them a connection request through the platform.
                </p>
                <p class="font-bold">Schedule a Time</p>
                <p>
                  You and the LifeLiner can arrange a time to talk using their
                  scheduling link.
                </p>
                <p class="font-bold">Connect and Talk</p>
                <p>
                  At the scheduled time, you'll connect through a private voice
                  conversation in a respectful, confidential, and supportive
                  environment.
                </p>
              </div>
              <p>The goal is simple:</p>
              <p class="font-bold">
                to provide connection, understanding, and compassionate
                listening when you need it most.
              </p>
            </div>
          </li>
          <li class="space-y-3 text-lg">
            <p class="font-medium text-2xl mt-5">
              Community for Canadians Abroad
            </p>
            <div class="space-y-1 text-md">
              <p>
                LifeLines also hosts a moderated online community on the
                LifeLines platform where Canadians living overseas can connect.
              </p>
              <p>
                Living abroad brings experiences that only other expatriates
                truly understand: adapting to new cultures, navigating
                unfamiliar systems, and sometimes feeling caught between worlds.
              </p>
              <p>
                Inside the LifeLines community, Canadians living abroad can:
              </p>
              <ul class="list-disc list-outside pl-8">
                <li>Share their experiences of living overseas</li>
                <li>
                  Ask questions and exchange practical suggestions about
                  navigating daily life abroad
                </li>
                <li>
                  Connect with other Canadians who understand what it's like to
                  live outside Canada
                </li>
              </ul>
              <p>
                The community is moderated to maintain a safe, respectful, and
                supportive space for everyone.
              </p>
              <p>
                Because sometimes the most comforting thing is realizing: <br />
                <b>you're not the only one navigating life far from home.</b>
              </p>
            </div>
          </li>
          <li class="space-y-3 text-lg">
            <p class="font-medium text-2xl mt-5">
              Global Crisis &amp; Support Directory
            </p>
            <div class="space-y-1 text-md">
              <p>
                LifeLines also maintains a
                <b
                  >curated directory of crisis and suicide hotlines around the
                  world</b
                >.
              </p>
              <p>
                Canada's
                <b>988 crisis line is not accessible outside Canada</b>, which
                means Canadians abroad often struggle to find immediate support
                during a crisis.
              </p>
              <p>
                LifeLines helps address this gap by organizing crisis resources
                by country, making it easier to locate local:
              </p>
              <ul class="list-disc list-outside pl-8">
                <li>Suicide and crisis hotlines</li>
                <li>Emergency mental health services</li>
                <li>Support organizations</li>
              </ul>
              <p>
                When someone is in distress, they shouldn't have to search the
                internet to figure out where to get help.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <ImageCarousel v-if="isMounted" />

      <div class="w-full container mx-auto px-5 md:px-32 xl:px-64 py-20">
        <p class="text-2xl font-medium mb-3">
          What <b class="text-primary">LifeLines Canada</b> is
        </p>
        <p>LifeLines Canada provides:</p>
        <ul class="list-disc list-outside pl-8 text-lg">
          <li>
            The LifeLiner Peer Support Program: free one-on-one listening
            support from Canadian volunteers
          </li>
          <li>
            A moderated online community on the LifeLines platform for Canadians
            living abroad
          </li>
          <li>
            A global directory of crisis and support hotlines organized by
            country
          </li>
        </ul>
        <p>
          Together, these create a trusted place where Canadians abroad can find
          support, connection, and understanding.
        </p>

        <p class="text-2xl font-medium mb-3 mt-10">
          What <b class="text-primary">LifeLines Canada</b> is NOT
        </p>
        <p>
          LifeLines Canada is not a substitute for professional mental health
          care.
        </p>
        <p>
          Our LifeLiner volunteers are compassionate peer supporters who provide
          <b>active listening and human connection</b>, but they are
          <b>not therapists</b>, <b>counselors</b>, or
          <b>medical professionals</b>. They do not provide diagnosis,
          treatment, or clinical advice.
        </p>
        <p>
          LifeLines Canada is also <b>not a crisis intervention service</b> and
          cannot replace emergency or crisis support in your country.
        </p>
        <p>
          If you are experiencing a life-threatening emergency or require
          immediate crisis support, please contact
          <b
            >local emergency services or a crisis hotline in the country where
            you are located</b
          >.
        </p>
        <p>
          While LifeLiners can offer supportive conversation and help you feel
          heard,
          <b
            >the LifeLiner program is intended for peer support and connection
            only</b
          >, and should not be relied upon as a replacement for professional or
          emergency services.
        </p>
        <p>
          LifeLines exists to complement existing support systems by providing
          <b
            >connection, compassionate listening, and guidance toward
            appropriate resources when needed</b
          >.
        </p>
      </div>
      <img
        src="/images/uncompressed/hoodie.webp"
        class="w-full object-contain"
      />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import ImageCarousel from "../components/ImageCarousel.vue";
import { useCacheControl } from "../composables/useCacheControl";

useCacheControl("public, s-maxage=3600, stale-while-revalidate=86400");

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>
