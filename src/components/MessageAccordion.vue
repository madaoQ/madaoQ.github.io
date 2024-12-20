<template>
    <div class="bg-white shadow rounded-lg overflow-hidden">
        <button @click="toggle"
            class="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none transition-colors duration-300">
            <span :class="colorClass">{{ item.apptitle }}</span>
            <svg :class="[isOpen ? 'rotate-180' : '', 'transform transition-transform duration-300 w-4 h-4']" fill="none"
                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <transition name="accordion" @enter="enter" @leave="leave">
            <div v-if="isOpen" class="p-4 border-t border-gray-200">
                <p><strong>Title:</strong> {{ item.title }}</p>
                <p><strong>Body:</strong> {{ item.text }}</p>
                <p><strong>Received at:</strong> {{ formatDate(item.time) }}</p>
                <p><strong>Package:</strong> {{ item.package }}</p>
                <p><strong>ID:</strong> {{ item.uniqueId }}</p>
                <p><strong>color:</strong> {{ item.colorId }}</p>
                <div class="mt-2 flex space-x-2">
                    <button @click="$emit('remove', item.uniqueId)"
                        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none">Remove</button>
                    <button @click="$emit('change-color', 'info')"
                        :class="['px-4 py-2 rounded focus:outline-none',  props.item.color === 'info' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-700']">Info</button>
                    <button @click="$emit('change-color', 'warning')"
                        :class="['px-4 py-2 rounded focus:outline-none',  props.item.color === 'warning' ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-300 text-gray-700']">Warning</button>
                    <button @click="$emit('change-color', 'error')"
                        :class="['px-4 py-2 rounded focus:outline-none',  props.item.color === 'error' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-700']">Error</button>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { type ExtendedNotification } from '@/stores/interface/index'

const props = defineProps<{
    item: ExtendedNotification;
}>();

const emit = defineEmits(['remove', 'change-color']);

const isOpen = ref(false);
const toggle = () => {
    isOpen.value = !isOpen.value;
};

// 新增的计算属性，用于根据 colorId 设置颜色
const currentColor = computed(() => {
    switch (props.item.colorId) {
        case 1: return 'info';
        case 2: return 'warning';
        case 3: return 'error';
        default: return undefined;
    }
});

const enter = (el: Element, done: () => void): void => {
    const element = el as HTMLElement; // 断言为 HTMLElement 如果需要的话
    element.style.height = `${element.scrollHeight}px`;
    requestAnimationFrame(() => {
        // 触发重绘，保证高度变化生效
        requestAnimationFrame(() => {
            // 再次触发重绘后执行完成回调
            done();
        });
    });
};

const leave = (el: Element, done: () => void): void => {
    const element = el as HTMLElement; // 断言为 HTMLElement 如果需要的话
    element.style.height = `${element.scrollHeight}px`;

    requestAnimationFrame(() => {
        element.style.height = '0px';
        // 监听 transitionend 事件来调用 done 回调
        const onTransitionEnd = (): void => {
            element.removeEventListener('transitionend', onTransitionEnd);
            done();
        };

        element.addEventListener('transitionend', onTransitionEnd);

        // Fallback in case transitionend is not triggered for some reason
        setTimeout(onTransitionEnd, 500); // 假设最大过渡时间为500ms
    });
};

const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};

// const colorClass = computed(() => {
//     switch (props.item.color) {
//         case 'info': return 'text-blue-500';
//         case 'warning': return 'text-yellow-500';
//         case 'error': return 'text-red-500';
//         default: return 'text-gray-800';
//     }
// });

const colorClass = computed(() => {
    if (!currentColor.value) return 'text-gray-800';

    switch (currentColor.value) {
        case 'info': return 'text-blue-500';
        case 'warning': return 'text-yellow-500';
        case 'error': return 'text-red-500';
    }
});

// watch(() => props.item.color, (newColor) => {
//     if (newColor) {
//         emit('change-color', newColor);
//     }
// });


</script>
  
<style scoped>
.accordion-enter-active,
.accordion-leave-active {
    transition: height 0.3s ease-out;
    overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
    height: 0;
}</style>