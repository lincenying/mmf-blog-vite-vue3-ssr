<template>
    <div v-if="offlineReady || needRefresh" class="app-refresh" id="app-refresh">
        <div class="app-refresh-wrap">
            <label v-if="offlineReady">应用程序准备离线工作</label>
            <label v-else>发现新的版本, 请刷新加载最新版本</label>
            <span v-if="needRefresh" @click="updateServiceWorker()">点击刷新</span>
            <span @click="close">点击关闭</span>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

const close = async () => {
    offlineReady.value = false
    needRefresh.value = false
}
</script>
