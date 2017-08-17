import { Inject, Injectable } from '@angular/core';
import { Notification } from './notification.model';
import { GLOBAL_CONFIG, GlobalConfig } from '../../config';
import { UUID } from 'angular2-uuid';
import {
  AddToNotificationCacheAction,
  RemoveFromNotificationCacheAction, UpdateStatusAction
} from '../core/cache/notification-cache.actions';
import { Store } from '@ngrx/store';
import { NotificationState } from '../core/cache/notification-cache.reducer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService{
  constructor(@Inject(GLOBAL_CONFIG) public config: GlobalConfig, private store : Store<NotificationState>) {
  }

  addNotification(message: string) {
    let notification = this.createNotification(message);
    if (notification.timeout > 0) {
      setTimeout(() => {
        this.closeNotificationAnimation(notification);
      }, notification.timeout);
    }
    this.store.dispatch(new AddToNotificationCacheAction(notification));
  }

  private createNotification(message: string) {
    let notification = new Notification();
    notification.type = this.config.notification.type;
    notification.dismissible = this.config.notification.dismissible;
    notification.timeout = this.config.notification.timeout;
    notification.message = message;
    let uuid: string = UUID.UUID();
    notification.id = uuid;
    return notification;
  }

  closeNotificationAnimation(notification: Notification) {
    this.store.dispatch(new UpdateStatusAction(notification.id, 'closing'));
  }

  expandNotification(notification: Notification) {
    this.store.dispatch(new UpdateStatusAction(notification.id, 'opening'));
  }

  notificationOpened(notification: Notification){
    this.store.dispatch(new UpdateStatusAction(notification.id, 'open'));
  }
  removeNotification(notification: Notification) {
    this.store.dispatch(new UpdateStatusAction(notification.id, 'closed'));
    this.store.dispatch(new RemoveFromNotificationCacheAction(notification.id));
  }

  getNotifications(): Observable<Notification[]> {
    let observable = this.store.select<NotificationState>('notification');
    return observable.map(value => value.notifications);
  }
}
