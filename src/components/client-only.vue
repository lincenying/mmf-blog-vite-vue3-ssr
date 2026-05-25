<template>
    <slot v-if="mounted" />
    <slot
        v-else
        name="fallback"
    >
        <slot name="placeholder">
            <component
                :is="props.fallbackTag || props.placeholderTag || 'span'"
            >
                {{ props.fallback || props.placeholder || '' }}
            </component>
        </slot>
    </slot>
</template>

<script setup lang="ts">
const props = defineProps<{
    fallback?: string
    placeholder?: string
    placeholderTag?: string
    fallbackTag?: string
}>()

const mounted = ref(false)

onMounted(() => {
    mounted.value = true
})
</script>
