import { Notification, NotificationType } from './notification.model';
import { GlobalConfig } from '../../config/global-config.interface';

export class NotificationBuilder {

  private notification: Notification;

  constructor(private config: GlobalConfig) {
    this.notification = new Notification();
    this.notification.type = this.config.notification.type;
    this.notification.dismissible= this.config.notification.dismissible;
    this.notification.timeout= this.config.notification.timeout;
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
