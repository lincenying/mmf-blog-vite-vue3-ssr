<template>
    <div class="card card-me">
        <router-link to="/user/account" active-class="active" class="side-entry"
            ><i class="icon icon-arrow-right"></i><i class="icon icon-menu-articles"></i>帐号</router-link
        >
        <router-link to="/user/password" active-class="active" class="side-entry"
            ><i class="icon icon-arrow-right"></i><i class="icon icon-menu-articles"></i>密码</router-link
        >
        <a @click="handleLogout" href="javascript:;" class="side-entry"
            ><i class="icon icon-arrow-right"></i><i class="icon icon-menu-articles"></i>退出</a
        >
    </div>
</template>

<script>
import useGlobal from '@/mixins/global'

export default {
    name: 'aside-account',
    setup() {
        // eslint-disable-next-line no-unused-vars
        const { ctx, options, route, router, store, useToggle, useHead, useLockFn, ref, reactive } = useGlobal()

        const handleLogout = async () => {
            await store.$api.post('frontend/user/logout', {})
            window.location.href = '/'
        }

        return {
            handleLogout
        }
    }
}
</script>
