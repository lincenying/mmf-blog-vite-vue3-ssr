<template>
    <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
        <div class="message">
            <span v-if="offlineReady"> 应用程序准备离线工作 </span>
            <span v-else> 新内容可用，单击[刷新]按钮更新. </span>
        </div>
        <button v-if="needRefresh" @click="updateServiceWorker()">刷新</button>
        <button @click="close">关闭</button>
    </div>
</template>

<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'

// eslint-disable-next-line no-unused-vars
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

// eslint-disable-next-line no-unused-vars
const close = async () => {
    offlineReady.value = false
    needRefresh.value = false
}
</script>
