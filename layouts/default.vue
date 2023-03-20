<template>
  <div>
    <noscript v-html="iFrameCode" />
    <div class="bg-white">
      <Header />
      <Nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iFrameCode:
        '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WDLHNJW" height="0" width="0" style="display: none; visibility: hidden" />',
    }
  },
  name: 'Default',
}
</script>

<style>
@import url(../assets/css/fonts.css);
/* body {
  background-color: #232741;
} */
</style>
