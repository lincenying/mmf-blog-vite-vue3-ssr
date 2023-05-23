<template>
    <div v-if="needRefresh" id="app-refresh" class="app-refresh">
        <div class="app-refresh-wrap">
            <label>新内容可用，单击刷新按钮更新</label>
            <span @click="updateServiceWorker()">刷新</span>
            <span @click="handleClose">关闭</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

defineOptions({
    name: 'ReloadPrompt',
})

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

async function handleClose() {
    offlineReady.value = false
    needRefresh.value = false
}
</script>
