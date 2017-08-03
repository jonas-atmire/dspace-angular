import { Inject, Injectable } from '@angular/core';
import { Notification, NotificationType } from './notification.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

@Injectable()
export class NotificationService {

  notifications: BehaviorSubject<Notification[]> ;

  constructor(@Inject(GLOBAL_CONFIG) public config: GlobalConfig){
    this.notifications = new BehaviorSubject<Notification[]>([]);
  }
  addNotification(message: string) {
    let notification = new Notification();
    notification.type=this.config.notification.type;
    notification.dismissible=this.config.notification.dismissible;
    // notification.timeout=this.config.notification.timeout;
    notification.message = message;
    if (notification.timeout > 0) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, notification.timeout);
    }
    let notifications = this.notifications.getValue();

    this.notifications.next([...notifications, notification])

  }

  public getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }

  removeNotification(notification: Notification){
    let notifications = this.notifications.getValue();
    let index: number = notifications.indexOf(notification);
    if (index !== -1) {
      notifications.splice(index, 1);
    }
  }


}
