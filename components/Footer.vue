<template>
    <footer class="w-full pt-11 pb-14 md:pt-14 md:pb-20 px-2 md:px-5 border-t md:border-t border-gray-200">    
        <div class="max-w-5xl  mx-auto px-5 flex flex-col md:flex-row items-center justify-start md:justify-between">
            <ul class="flex flex-col md:flex-row text-sm space-y-2 md:space-y-0">
                <li class="text-sm text-gray-700 mr-0 md:mr-3 flex justify-center"><nuxt-link to="#" class="hover:text-cherry">根性</nuxt-link></li>
                <li class="hidden text-sm text-gray-700 mr-0 md:mr-3 justify-center md:flex">|</li>
                <li class="text-sm text-gray-700 mr-0 md:mr-3 flex justify-center"><a href="https://github.com/xaveaq" target="_blank"><GithubLogo /></a></li>
            </ul>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'Footer',
    }
</script>

<style scoped>
</style>