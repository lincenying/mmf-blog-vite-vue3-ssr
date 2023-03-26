<template>
    <nav class="global-nav">
        <div class="wrap">
            <div class="left-part">
                <router-link to="/" active-class="current" exact class="logo-link">
                    <i class="icon icon-nav-logo"></i><span class="hidden">M.M.F 小屋</span>
                </router-link>
                <div class="main-nav">
                    <router-link to="/" active-class="current" exact class="nav-link">
                        <i class="icon icon-nav-home"></i><span class="text">首页</span>
                    </router-link>
                    <router-link to="/trending/visit" active-class="current" class="nav-link">
                        <i class="icon icon-nav-explore"></i><span class="text">热门</span>
                    </router-link>
                    <router-link to="/about" active-class="current" class="nav-link">
                        <i class="icon icon-nav-features"></i><span class="text">关于</span>
                    </router-link>
                    <a href="https://handle.mmxiaowu.com/" target="_blank" class="nav-link">
                        <i class="icon icon-nav-game"></i><span class="text">汉兜</span>
                    </a>
                </div>
            </div>
            <div v-if="!isBackend" class="right-part">
                <span class="nav-search">
                    <i class="icon icon-search-white"></i>
                    <input placeholder="记得按回车哦" class="nav-search-input" @keyup.enter="onSearch($event)" />
                </span>
                <span v-if="isLogin" class="nav-me">
                    <router-link to="/user/account" class="nav-me-link">
                        <img :src="$f.Avatar(cookies.useremail, 100)" class="nav-avatar-img" />
                    </router-link>
                </span>
                <span v-else class="nav-me">
                    <a href="javascript:;" class="nav-me-link" @click="handleLogin">
                        <img :src="$f.Avatar('noavatar')" class="nav-avatar-img" />
                    </a>
                </span>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
    isBackend: boolean
}>()

defineOptions({
    name: 'global-navigation'
})

const $f = useFilters()

const { isBackend } = $(toRefs(props))

// eslint-disable-next-line no-unused-vars
const { router, globalStore } = useGlobal()

const { cookies } = $(storeToRefs(globalStore))

const isLogin = computed(() => {
    return !!cookies.user
})

const handleLogin = () => {
    globalStore.setLoginModal(true)
}
const onSearch = (e: any) => {
    var qs = e.target.value
    if (qs === '') {
        return false
    }
    router.replace(`/search/${qs}`)
}
</script>
