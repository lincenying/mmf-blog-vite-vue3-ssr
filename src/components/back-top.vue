<template>
    <div v-show="scrollTop > 500" class="back-top">
        <a href="javascript:;" @click="handleBackTop" />
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BackTop',
})

const { y: scrollTop } = useWindowScroll()

function handleBackTop() {
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
</script>
