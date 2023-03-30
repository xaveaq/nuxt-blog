<template>
  <article class="relative max-w-7xl mx-auto justify-center mb-10 md:mb-10">
    <!-- Head of article -->
    <header
      class="flex flex-col item-start text-base justify-center text-center mt-1 mb-7 md:mb-16"
    >
      <div class="px-5 pt-12">
        <span class="tag-btn"
          ><span class="text-gray-600 text-sm">{{
            article.category
          }}</span></span
        >
      </div>

      <h1
        class="px-5 md:px-0 md:pt-10 mb-5 text-6xl md:text-3xl text-center font-bold text-gray-700 keepall"
      >
        {{ article.title }}
      </h1>
      <p class="text-base md:text-base text-gray-500 text-center">
        {{ article.datetime }} by {{ article.author }}
      </p>
    </header>

    <div class="p-2 grid grid-cols-4 gap-2">
      <!-- Body of article -->
      <div
        class="col-span-4 sm:col-span-4 md:col-span-3 w-full prose lg:prose-2xl"
      >
        <nuxt-content
          :document="article"
          class="prose max-w-6xl keepall px-6 selection:bg-cherrylight"
        />
      </div>

      <!-- Body of ToC -->
      <aside ref="toc" class="toc">
        <div class="sticky top-24 mb-12">
          <span class="toc-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
          </span>
          <nav class="mt-4">
            <ul>
              <li
                @click="tableOfContentsHeadingClick(link)"
                :class="{
                  'pl-4': link.depth === 3,
                }"
                v-for="link of article.toc"
                :key="link.id"
              >
                <a
                  :class="{
                    'text-red-500 hover:text-red-600':
                      link.id === currentlyActiveToc,
                    'text-black hover:gray-900': link.id !== currentlyActiveToc,
                  }"
                  role="button"
                  class="transition-colors duration-75 text-xs mb-2 block"
                  :href="`#${link.id}`"
                  >{{ link.text }}</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>

    <!-- Tags and Comments -->
    <hr />

    <div class="space-x-2 flex-1 mt-7 mb-3 px-6">
      <div class="inline-flex text-gray-700 text-xs md:text-base">Tags:</div>
      <div
        v-for="(tag, idx) in article.tags"
        :key="idx"
        class="inline-flex text-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs mb-1"
      >
        #{{ tag }}
      </div>
    </div>
    <Comments />
    <Prevnext :prev="prev" :next="next" />
  </article>
</template>

<script>
export default {
  // intersection observation for toc
  data() {
    return {
      currentlyActiveToc: '',
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0,
      },
    }
  },
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')
        if (entry.isIntersecting) {
          this.currentlyActiveToc = id
        }
      })
    }, this.observerOptions)

    // Track all sections that have an `id` applied
    document
      .querySelectorAll('.nuxt-content h2[id], .nuxt-content h3[id]')
      .forEach((section) => {
        this.observer.observe(section)
      })
  },
  beforeDestroy() {
    this.observer.disconnect()
  },

  async asyncData({ $content, params, error }) {
    try {
      const article = await $content('blog', params.slug).fetch()

      const [prev, next] = await $content('blog')
        .only(['title', 'slug'])
        .sortBy('createdAt', 'asc')
        .surround(params.slug)
        .fetch()

      return { article, prev, next }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      })
    }
  },
  methods: {
    tableOfContentsHeadingClick(link) {
      this.currentlyActiveToc = link.id
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
  head() {
    return {
      title: this.article.title,
      htmlAttrs: {
        lang: 'ko',
      },
      meta: [
        { name: 'author', content: 'Xaveaq' },
        {
          name: 'description',
          property: 'og:description',
          content: this.article.description,
          hid: 'description',
        },
        { hid: 't-type', name: 'twitter:card', content: 'summary' },
        { hid: 'og-type', property: 'og:type', content: 'website' },
        { property: 'og:title', content: this.article.title },
        {
          hid: 'og:url',
          name: 'og:url',
          content: `https://xaveaq.netlify.app/${this.$route.params.slug}`,
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://xaveaq.netlify.app/blog/${this.$route.params.slug}`,
        },
      ],
    }
  },
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://xaveaq.netlify.app/${this.$route.params.slug}`,
      },
      headline: this.article.title,
      description: this.article.description,
      image:
        'https://raw.githubusercontent.com/givemetarte/blog/main/assets/images/thumbnail.png',
      author: {
        '@type': 'Person',
        name: 'Xaveaq',
        email: 'mail@gmail.com',
        url: 'https://xaveaq.netlify.app/about',
        nationality: {
          '@type': 'Country',
          name: 'South Korea',
        },
      },
      datePublished: this.article.datetime,
      inLanguage: 'ko',
      keywords: this.article.tags,
    }
  },
}
</script>

<style scpoed>
.toc {
  @media only screen and (max-width: 768px) {
    display: none;
  }
}

.toc-svg {
  color: darkorange;
}

.nuxt-content h2 {
  @apply text-gray-700 text-3xl mt-14 mb-4;
  @media only screen and (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.nuxt-content h3 {
  @apply text-gray-600 text-2xl mt-8 mb-4;
  @media only screen and (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.tag-btn {
  @apply inline-block px-3 py-1.5 mr-1 md:mr-2 mb-2 rounded-full bg-gray-100 text-gray-400 text-sm transition hover:bg-lavenderblush hover:duration-100 hover:drop-shadow-sm;
}

.note {
  @apply bg-lavenderblush px-6 py-1 rounded-lg font-medium;
}

.img {
  @apply mt-6 mb-8 rounded-xl;
}

.line {
  @apply underline-offset-2 decoration-cherry decoration-wavy;
}

.nuxt-content-highlight {
  @apply text-xl overflow-x-scroll;
  @media only screen and (max-width: 1024px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

code::before {
  content: none !important;
}

code::after {
  content: none !important;
}

.keepall {
  word-break: keep-all;
}
</style>
