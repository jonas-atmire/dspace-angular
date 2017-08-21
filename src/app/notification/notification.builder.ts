import { Notification, NotificationType } from './notification.model';

export class NotificationBuilder {

  private notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  public id(id: string): NotificationBuilder {
    this.notification.id = id;
    return this;
  }

  public message(message: string): NotificationBuilder {
    this.notification.message = message;
    return this;
  }

  public type(type: NotificationType): NotificationBuilder {
    this.notification.type = type;
    return this;
  }

  public title(title: string): NotificationBuilder {
    this.notification.title = title;
    return this;
  }

  public timeout(timeout: number): NotificationBuilder {
    this.notification.timeout = timeout;
    return this;
  }

  public dismissible(dismissible: boolean): NotificationBuilder {
    this.notification.dismissible = dismissible;
    return this;
  }

  public build(): Notification {
    return this.notification;
  }
}
