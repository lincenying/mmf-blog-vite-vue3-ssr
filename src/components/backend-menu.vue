<template>
    <div class="main-right">
        <div class="card card-me">
            <router-link to="/backend/admin/list" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />管理帐号
            </router-link>
            <router-link to="/backend/user/list" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />用户列表
            </router-link>
        </div>
        <div class="card card-me">
            <router-link to="/backend/category/insert" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />添加分类
            </router-link>
            <router-link to="/backend/category/list" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />管理分类
            </router-link>
            <router-link to="/backend/article/insert" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />发布文章
            </router-link>
            <router-link to="/backend/article/list" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />管理文章
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BackendMenu',
})
</script>
