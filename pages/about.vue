<template>
  <div class="max-w-4xl mx-auto">
    <!-- <div class="px-5">
            <div class="pt-10 md:pt-12 text-xl md:text-2xl text-gray-700 font-semibold mb-2 text-center md:text-left">About</div>
        </div> -->

    <!--if media query: -->
    <div class="hidden md:block">
      <div class="my-20 px-24 flex flex-row justify-between">
        <div class="w-52 h-52">
          <img :src="require(`~/assets/images/profile.jpg`)" class="profile" />
        </div>
        <div class="w-2/3 py-8 pl-4">
          <div class="text-gray-600 font-semibold text-lg">根性</div>
          <div class="text-gray-400 font-thin text-base md:mb-8">
            힘이 아니라 집념이 위대한 일을 성취시킨다
          </div>
          <div class="mt-5 text-green-800 font-normal text-base keepall">
            <a
              href="https://github.com/xaveaq"
              target="_blank"
              class="highlight-xs"
              >🟩 Github</a
            >
          </div>
        </div>
      </div>
    </div>
    <!--else:-->
    <div class="block md:hidden">
      <div class="my-10 px-5 flex flex-col items-center">
        <div class="w-40 h-40 mb-10">
          <img :src="require(`~/assets/images/profile.jpg`)" class="profile" />
        </div>
        <div class="w-4/5 md:w-2/3 text-gray-600 font-normal text-sm">
          <div class="text-gray-600 font-medium text-base text-center keepall">
            根性
          </div>
          <div class="text-sm text-center mt-3">
            <a href="https://github.com/xaveaq" class="highlight-xs">github</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'About',
    htmlAttrs: {
      lang: 'ko',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '根性 is on here' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
  },
}
</script>

<style scope>
.profile {
  border-radius: 70%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.keepall {
  word-break: keep-all;
}
</style>
