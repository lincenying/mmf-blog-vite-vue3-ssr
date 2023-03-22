<template>
    <div class="card card-me">
        <router-link to="/user/account" active-class="active" class="side-entry">
            <i class="icon icon-arrow-right"></i><i class="icon icon-menu-articles"></i>帐号
        </router-link>
        <router-link to="/user/password" active-class="active" class="side-entry">
            <i class="icon icon-arrow-right"></i><i class="icon icon-menu-articles"></i>密码
        </router-link>
        <a href="javascript:;" class="side-entry" @click="handleLogout">
            <i class="icon icon-arrow-right"></i><i class="icon icon-menu-articles"></i>退出
        </a>
    </div>
</template>

<script setup lang="ts">
import api from '@/api/index-client'

defineOptions({
    name: 'aside-account'
})

const handleLogout = async () => {
    await api.post('frontend/user/logout', {})
    window.location.href = '/'
}
</script>
