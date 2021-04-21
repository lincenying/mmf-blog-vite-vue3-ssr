<template>
    <div v-if="needRefresh" class="app-refresh" id="app-refresh">
        <div class="app-refresh-wrap">
            <label>新内容可用，单击刷新按钮更新</label>
            <span @click="updateServiceWorker()">刷新</span>
            <span @click="close">关闭</span>
        </div>
    </div>
</template>

<script>
import { useRegisterSW } from 'virtual:pwa-register/vue'

export default {
    setup() {
        const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

        const close = async () => {
            offlineReady.value = false
            needRefresh.value = false
        }

        return {
            offlineReady,
            needRefresh,
            updateServiceWorker,
            close
        }
    }
}
</script>
