<template>
    <nav class="global-nav">
        <div class="wrap">
            <div class="left-part">
                <router-link to="/" active-class="current" exact class="logo-link">
                    <i class="icon icon-nav-logo" /><span class="hidden">M.M.F 小屋</span>
                </router-link>
                <div class="main-nav">
                    <router-link to="/" active-class="current" exact class="nav-link">
                        <i class="icon icon-nav-home" /><span class="text">首页</span>
                    </router-link>
                    <router-link to="/trending/visit" active-class="current" class="nav-link">
                        <i class="icon icon-nav-explore" /><span class="text">热门</span>
                    </router-link>
                    <router-link to="/about" active-class="current" class="nav-link">
                        <i class="icon icon-nav-features" /><span class="text">关于</span>
                    </router-link>
                    <a href="https://handle.mmxiaowu.com/" target="_blank" class="nav-link">
                        <i class="icon icon-nav-game" /><span class="text">汉兜</span>
                    </a>
                </div>
            </div>
            <div v-if="!isBackend" class="right-part">
                <span class="nav-search">
                    <i class="icon icon-search-white" />
                    <input placeholder="记得按回车哦" name="search" class="nav-search-input" @keyup.enter="onSearch($event)">
                </span>
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
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
defineOptions({
    name: 'GlobalNavigation',
})

const props = defineProps<{
    isBackend: boolean
}>()

const { isBackend } = $(toRefs(props))

const globalStore = useGlobalStore()
const { cookies } = $(toRefs(globalStore))

const isLogin = computed(() => !!cookies.user)

function handleLogin() {
    globalStore.setLoginModal(true)
}

const router = useRouter()
function onSearch(e: Event) {
    const qs = (e.target as HTMLInputElement).value
    if (qs === '') {
        return false
    }

    router.replace(`/search/${qs}`)
}
</script>
