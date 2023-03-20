export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  buildDir: 'dist',
  // ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '根性',
    htmlAttrs: {
      lang: 'ko',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '根性' },
      { name: 'format-detection', content: 'telephone=no' },
      // Twitter
      // Test on: https://cards-dev.twitter.com/validator
      {
        hid: 't-type',
        name: 'twitter:card',
        content: 'summary',
      },
      // Open Graph
      // Test on: https://developers.facebook.com/tools/debug/
      // { hid: 'og:site_name', property: 'og:site_name', content: "根性" },
      // {
      //   hid: 'og:image',
      //   property: 'og:image',
      //   content: 'https://raw.githubusercontent.com/givemetarte/blog/main/assets/images/thumbnail.png'
      // },
      // {
      //   hid: 'og:image:secure_url',
      //   property: 'og:image:secure_url',
      //   content: 'https://raw.githubusercontent.com/givemetarte/blog/main/assets/images/thumbnail.png'
      // },
      // {
      //   hid: 'og:image:alt',
      //   property: 'og:image:alt',
      //   content: 'Logo Image'
      // }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon-cherry0.ico' }],
    script: [
      {
        innerHTML: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WDLHNJW');`,
      },
    ],
  },

  loading: { color: '#c06c84' },

  // 404 error page
  generate: {
    fallback: true,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // add tailwind.css
    '@/assets/css/tailwind.css',
    '~/assets/css/fonts.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/jsonld.js', '@/plugins/vue-gtag'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt-hero-icons/outline/nuxt',
    '@nuxt-hero-icons/solid/nuxt',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/gtm',
  ],

  // Google Tag Manager
  gtm: {
    id: 'GTM-WDLHNJW',
  },

  sitemap: {
    hostname: 'https://xaveaq.netlify.app',
    gzip: true,
    routes: ['/blog/ga4/', '/blog/test/'],
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-one-light.css',
      },
    },
    liveEdit: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
