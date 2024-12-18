<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Received Notifications Test</h1>
    <div v-if="receivedNotifications.length > 0" class="space-y-4">
      <Accordion 
        v-for="notification in receivedNotifications" 
        :key="notification.uniqueId" 
        :item="notification" 
        @remove="removeNotification(notification.uniqueId)"
        @change-color="changeColor(notification.uniqueId, $event)"
      />
    </div>
    <p v-else class="text-gray-500">No notifications received yet.</p>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useMessageStore } from '@/stores/modules/useMessage';
import Accordion from '@/components/MessageAccordion.vue'; // 确保路径正确

const messageStore = useMessageStore();
const { receivedNotifications } = toRefs(messageStore);

// 辅助函数：格式化时间戳
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// 删除通知的方法
const removeNotification = (uniqueId: string) => {
  messageStore.removeNotification(uniqueId);
};

// 改变颜色的方法
const changeColor = (uniqueId: string, color: 'info' | 'warning' | 'error') => {
  messageStore.changeNotificationColor(uniqueId, color);
};
</script>

<style scoped>
/* 使用 Tailwind CSS，无需额外的样式 */
</style>