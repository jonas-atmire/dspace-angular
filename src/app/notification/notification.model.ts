export class Notification {
  message: string;
  type: NotificationType;
  title: string;
  timeout: number;
  dismissible: boolean;
  closed: boolean = false;
  state: string = 'void';
}

export enum NotificationType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger'
}

