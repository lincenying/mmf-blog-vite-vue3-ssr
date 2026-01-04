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

const intervalMS = 5 * 60 * 1000 // 5 minutes

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
        r
        && setInterval(async () => {
            if (r.installing || !navigator)
                return

            if ('connection' in navigator && !navigator.onLine)
                return

            const resp = await fetch(swUrl, {
                cache: 'no-store',
                headers: {
                    'cache': 'no-store',
                    'cache-control': 'no-cache',
                },
            })

            if (resp?.status === 200)
                await r.update()
        }, intervalMS)
    },
    onRegisterError(error) {
        console.error('Service worker registration error', error)
    },
})

async function handleClose() {
    offlineReady.value = false
    needRefresh.value = false
}
</script>
