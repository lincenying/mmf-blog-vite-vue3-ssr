<script lang="ts">
import { createElementBlock } from 'vue'

export default defineComponent({
    name: 'ClientOnly',

    props: {
        fallback: String,
        placeholder: String,
        placeholderTag: String,
        fallbackTag: String,
    },

    setup(_, { slots }) {
        const mounted = ref(false)
        onMounted(() => {
            mounted.value = true
        })
        return (props: { fallback: string, placeholder: string, fallbackTag: string, placeholderTag: string }) => {
            if (mounted.value) {
                return slots.default?.()
            }

            const slot = slots.fallback || slots.placeholder
            if (slot) {
                return slot()
            }

            const fallbackStr = props.fallback || props.placeholder || ''
            const fallbackTag = props.fallbackTag || props.placeholderTag || 'span'
            return createElementBlock(fallbackTag, null, fallbackStr)
        }
    },
})
</script>
