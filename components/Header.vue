<template>
  <header class="sticky top-0 z-50 w-full px-6 py-5 bg-black">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <!-- <div
        class="max-w-fit ml-1.5 md:ml-0 hover:animate-wiggle hover:drop-shadow"
      >
        <nuxt-link to="/">
          <NuxtLogo />
        </nuxt-link>
      </div> -->
      <div>
        <ul class="flex space-x-2 text-base items-center">
          <li>
            <div
              class="text-gray-200 py-1 px-2 rounded-lg hover:animate-wiggle hover:drop-shadow"
            >
              <nuxt-link to="/"> HOME </nuxt-link>
            </div>
          </li>
          <li>
            <div class="py-1 px-2 rounded-lg">
              <nuxt-link
                :to="{ path: '/all-post' }"
                replace
                class="text-gray-200 text-sm md:text-base hover:text-cherry poppins"
              >
                POSTS
              </nuxt-link>
            </div>
          </li>
          <li>
            <div class="py-1 px-2 rounded-lg">
              <nuxt-link
                :to="{ path: '/about' }"
                replace
                class="text-gray-300 text-sm md:text-base hover:text-cherry poppins"
              >
                ABOUT
              </nuxt-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>
