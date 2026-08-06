<template>
    <span v-if="isLogin" class="nav-me">
        <router-link to="/user/account" class="nav-me-link">
            <img :src="useAvatar(cookies.useremail, 100)" class="nav-avatar-img">
        </router-link>
    </span>
    <span v-else class="nav-me">
        <a href="javascript:;" class="nav-me-link" @click="handleLogin">
            <img :src="useAvatar('noavatar')" class="nav-avatar-img">
        </a>
    </span>
</template>

<script setup lang="ts">
import { useAvatar } from '@/composables'
import { useGlobalStore } from '@/stores/use-global-store'

defineOptions({
    name: 'UserIcon',
})

const globalStore = useGlobalStore()
const { cookies } = storeToRefs(globalStore)

const isLogin = computed(() => !!cookies.value.user)

function handleLogin() {
    globalStore.setLoginModal(true)
}
</script>
