<template>
    <div v-show="scrollTop > 500" class="back-top"><a @click="handleBackTop" href="javascript:;"></a></div>
</template>

<script>
import { onBeforeMount, onMounted, ref } from 'vue'

export default {
    name: 'back-top',
    setup() {
        const scrollTop = ref(0)

        const scrolling = () => {
            if (window.scrollTime) window.clearTimeout(window.scrollTime)
            window.scrollTime = window.setTimeout(() => {
                scrollTop.value = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
            }, 100)
        }
        const handleBackTop = () => {
            let top = scrollTop.value
            const timer = setInterval(() => {
                top -= Math.abs(top * 0.1)
                if (top <= 1) {
                    top = 0
                    clearInterval(timer)
                }
                window.scrollTo(0, top)
                // document.body.scrollTop = top
            }, 20)
        }

        onMounted(() => {
            window.addEventListener('scroll', scrolling)
        })

        onBeforeMount(() => {
            window.removeEventListener('scroll', scrolling)
        })

        return {
            scrollTop,
            scrolling,
            handleBackTop
        }
    }
}
</script>
