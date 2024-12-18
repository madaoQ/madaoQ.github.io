<template>
    <svg aria-hidden="true" :style="{ width, height }">
        <use :href="symbolId" :fill="color" />
    </svg>
</template>
  
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    prefix: {
        type: String,
        default: 'icon',
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#333',
    },
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }
});

// 计算属性
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
  
<style scoped>
/* 如果有样式需求可以在这里添加 */
</style>