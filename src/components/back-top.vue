<template>
    <div v-show="visible" class="back-top">
        <a href="javascript:;" @click="handleBackTop" />
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BackTop',
})

const visible = ref(false)
const scrollTop = ref(0)

/**
 * 节流更新滚动位置，超过阈值才显示回到顶部。
 */
const updateScroll = useThrottleFn(() => {
    const top = window.scrollY || document.documentElement.scrollTop || 0
    scrollTop.value = top
    visible.value = top > 500
}, 200)

onMounted(() => {
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
})

/**
 * 平滑回到页面顶部。
 */
function handleBackTop() {
    let top = scrollTop.value
    const timer = setInterval(() => {
        top -= Math.abs(top * 0.1)
        if (top <= 1) {
            top = 0
            clearInterval(timer)
        }
        window.scrollTo(0, top)
    }, 20)
}
</script>
