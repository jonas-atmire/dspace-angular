import { NotificationType } from '../app/notification/notification.model';

export interface NotificationConfig{
  type: NotificationType;
  dismissible: boolean;
  timeout: number;
}
