import { defineStore } from 'pinia';
import { type Message, type MessageList } from '@/stores/interface/index'
import { type AndroidNotification, NotificationsListener, type NotificationsListenerPlugin, type ListenerOptions } from 'capacitor-notifications-listener';
import { type ExtendedNotification } from '@/stores/interface/index'
import { ref, toRef } from 'vue';
export const useMessageStore = defineStore('message', {
  state: () => ({
    // 用于存储接收到的通知
    receivedNotifications: ref<ExtendedNotification[]>([]),
  }),
  actions: {
    getMessageById(id: number) {
      return this.receivedNotifications.find(n => parseInt(n.uniqueId) === id)
    },
    fetchNotification() {
      const systemNotificationListener: NotificationsListenerPlugin = NotificationsListener;
      const options: ListenerOptions = {
        cacheNotifications: true // 请求通知缓存权限
      };
      // 检查是否已经在监听通知
      systemNotificationListener.isListening().then((result) => {
        if (!result.value) {
          // 显示权限屏幕
          systemNotificationListener.requestPermission();
        }
      }).catch((error) => {
        console.error('Error checking if notification listener is active:', error);
      });

      // 生成唯一 ID 的辅助函数
      let uniqueCounter = 0;
      const generateUniqueId = (): string => {
        return `${Date.now()}-${uniqueCounter++}`;
      };
      //关闭监听器
      // const closeListener = ()=>{
      //   // options.cacheNotifications=false;
      //   systemNotificationListener.stopListening;
      // }

      // 初始化监听器
      systemNotificationListener.startListening(options);


      // 添加通知接收和移除事件监听器
      systemNotificationListener.addListener("notificationReceivedEvent", (notification: AndroidNotification) => {
        const uniqueId = generateUniqueId();
        const extendedNotification = { ...notification, uniqueId };
        // 确保通知唯一性
        if (!this.receivedNotifications.find(n => n.uniqueId === uniqueId) && extendedNotification.title !== '') {
          this.receivedNotifications.unshift(extendedNotification);
        }
      });

      // 添加通知移除事件监听器
      const notificationRemovedListener = systemNotificationListener.addListener("notificationRemovedEvent", (notification: AndroidNotification) => {
        // logic ...
      });

      

      function stop() {
        systemNotificationListener.stopListening();
        systemNotificationListener.removeAllListeners();
      };

      return stop;
    },
    removeNotification(uniqueId: string) {
      // 找到索引并移除通知
      const index = this.receivedNotifications.findIndex(n => n.uniqueId === uniqueId);
      if (index !== -1) {
        this.receivedNotifications.splice(index, 1);
      }
    },
    changeNotificationColor(uniqueId: string, color: 'info' | 'warning' | 'error') {
      // 更新指定通知的颜色
      const notification = this.receivedNotifications.find(n => n.uniqueId === uniqueId);
      if (notification) {
        notification.color = color;
      }
    }
  }
});