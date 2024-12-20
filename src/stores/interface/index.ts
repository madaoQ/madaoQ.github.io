import { type AndroidNotification, NotificationsListener, type NotificationsListenerPlugin, type ListenerOptions } from 'capacitor-notifications-listener';
export interface Message {
    id:number,
    title:string,
    content:string,
    timestamp:number
}
export interface MessageList{
    MwssageStore: Message[]
}
export interface ExtendedNotification extends AndroidNotification {
    uniqueId: string;
    color?: 'info' | 'warning' | 'error';
    colorId?: number;
  }
  