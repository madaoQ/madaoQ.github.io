<script setup lang="ts">
import Chart from './components/Chart.vue'
import { onMounted, onUnmounted, ref } from 'vue';

// 缓存对 .container 的引用
const box = ref<HTMLElement | null>(null);

// 计算缩放的比例
function getScale(w = 1920, h = 1080): number {
    const ww = window.innerWidth / w;
    const wh = window.innerHeight / h;
    return Math.min(ww, wh) * 2.3;
}

// 应用缩放
function applyScale() {
    if (box.value) {
        box.value.style.setProperty('transform', `scale(${getScale()})`);
        // console.log('@@@@@@@@change');
    } else {
        console.error("Element with class 'container' not found.");
    }
}

// 在组件挂载时初始化并设置事件监听器
onMounted(() => {
    box.value = document.querySelector<HTMLElement>('.box');
    applyScale(); // 初始化时应用一次缩放
    window.addEventListener('resize', applyScale);
});

// 在组件卸载时移除事件监听器
onUnmounted(() => {
    if (box.value) {
        window.removeEventListener('resize', applyScale);
    }
});
</script>


<template>
    <div class="container">
        <div class="box">
            <chart class="scaled-chart"></chart>
        </div>
    </div>
</template>


<style scoped>
.container {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    height: 100vh;
    /* 使容器高度为视口高度 */
    width: 100%;
    /* 确保容器宽度为100% */
}
</style>
<!-- .scaled-chart {
  transform: scale(1.5); /* 放大到原来的1.5倍 */
  transform-origin: center; /* 确保缩放中心为元素中心 */
} -->