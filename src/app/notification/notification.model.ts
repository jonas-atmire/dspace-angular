export class Notification {
  id: string;
  message: string;
  type: NotificationType;
  title: string;
  timeout: number;
  dismissible: boolean;
  state: string = 'opening';
}

export enum NotificationType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger'
}

