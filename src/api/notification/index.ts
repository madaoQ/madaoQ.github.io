//接收通知的API
import { type AndroidNotification, NotificationsListener, type NotificationsListenerPlugin, type ListenerOptions } from 'capacitor-notifications-listener';

const systemNotificationListener: NotificationsListenerPlugin = NotificationsListener;
const options: ListenerOptions = {
  cacheNotifications: true // 请求通知权限
};

systemNotificationListener.startListening(options);
systemNotificationListener.startListening({ cacheNotifications: true }); 

systemNotificationListener.addListener("notificationReceivedEvent", (notification: AndroidNotification) => {
    // logic ...
});
systemNotificationListener.addListener("notificationRemovedEvent", (notification: AndroidNotification) => {
    // logic ...
});
systemNotificationListener.isListening().then((result) => {
    if (!result.value) {
        // 显示权限屏幕
        systemNotificationListener.requestPermission();
    }
}).catch((error) => {
    console.error('Error checking if notification listener is active:', error);
});

