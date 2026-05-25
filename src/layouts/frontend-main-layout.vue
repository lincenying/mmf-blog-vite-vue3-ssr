<template>
    <div class="main wrap">
        <div class="main-left">
            <slot />
        </div>
        <div
            v-if="$slots.aside"
            class="main-right"
        >
            <slot name="aside" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FrontendMainLayout',
})
</script>
