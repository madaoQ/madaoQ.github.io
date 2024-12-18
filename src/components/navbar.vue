<script lang="ts" setup>
import { ref } from 'vue';
import SvgIcon from '@/components/svgicon.vue';

// 使用ref定义响应式数据
const activeIndex = ref('1'); // 默认激活的菜单项索引

// 定义方法
const handleSelect = (key: string) => {
    console.log(`Selected item ${key}`);
    activeIndex.value = key;
};




import { toRefs, onUnmounted ,onMounted} from 'vue';
import { useMessageStore } from '@/stores/modules/useMessage';
const messageStore = useMessageStore();
const stop = messageStore.fetchNotification();
const { receivedNotifications } = toRefs(messageStore);

//Store数据更改，页面数据跟着去改
messageStore.$subscribe((mutate, state) => {
  receivedNotifications.value = state.receivedNotifications;
})

onUnmounted(() => {
  stop();
})

</script>

<template>
    <div class="bottom-nav">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="nav-menu">
            <RouterLink to="/home">
                <el-menu-item index="1" :class="{ 'is-active': activeIndex === '1' }">
                    <SvgIcon name="home" width="30px" height='30px'></SvgIcon>
                </el-menu-item>
            </RouterLink>
            <RouterLink to="/chart">
                <el-menu-item index="2" :class="{ 'is-active': activeIndex === '2' }">
                    <SvgIcon name="chart" width="30px" height='30px'></SvgIcon>
                </el-menu-item>
            </RouterLink>
            <RouterLink to="/user">
                <el-menu-item index="3" :class="{ 'is-active': activeIndex === '3' }">
                    <SvgIcon name="user" width="30px" height='30px'></SvgIcon>
                </el-menu-item>
            </RouterLink>
        </el-menu>
    </div>
</template>

<style scoped>
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    /* 添加内边距 */
}

.nav-menu {
    display: flex;
    justify-content: space-around;
    border-top: none;
    margin: 0;
    padding: 0;
}

.nav-menu .el-menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px !important;
    transition: background-color 0.3s ease;
    /* 添加过渡效果 */
    border-radius: 15px;
}

/* 活动项的样式 */
.is-active {
    background-color: #409eff;
    /* 设置活动项背景颜色 */
    color: white;
    /* 设置活动项文字颜色 */
}

/* 悬停时的样式 */
.nav-menu .el-menu-item:hover {
    background-color: #f5f7fa;
    /* 设置悬停时的背景颜色 */
}
</style>