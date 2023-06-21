<template>
    <div class="card card-me">
        <router-link to="/user/account" active-class="active" class="side-entry">
            <i class="icon icon-arrow-right" /><i class="icon icon-menu-articles" />帐号
        </router-link>
        <router-link to="/user/password" active-class="active" class="side-entry">
            <i class="icon icon-arrow-right" /><i class="icon icon-menu-articles" />密码
        </router-link>
        <a href="javascript:;" class="side-entry" @click="handleLogout">
            <i class="icon icon-arrow-right" /><i class="icon icon-menu-articles" />退出
        </a>
    </div>
</template>

<script setup lang="ts">
import api from '@/api/index-client'

defineOptions({
    name: 'AsideAccount',
})

async function handleLogout() {
    await api.post<string>('frontend/user/logout', {})
    window.location.href = '/'
}
</script>
