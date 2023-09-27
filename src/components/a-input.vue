<template>
    <div class="settings-section">
        <div class="settings-item with-input">
            <h4 class="settings-title">{{ title }}</h4>
            <div class="settings-item-content" :class="classes">
                <div class="settings-input-wrap"><slot /></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'AInput',
})

const props = defineProps<{
    title: string
    classes?: string
}>()

const { title, classes } = $(toRefs(props))
</script>
