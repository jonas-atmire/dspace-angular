import { Action } from '@ngrx/store';

import { type } from '../../shared/ngrx/type';
import { Notification } from '../../notification/notification.model';

/**
 * The list of NotificationCacheAction type definitions
 */
export const NotificationCacheActionTypes = {
  ADD: type('dspace/core/cache/notification/ADD'),
  REMOVE: type('dspace/core/cache/notification/REMOVE'),
  UPDATE_STATUS: type('dspace/core/cache/notification/EXPAND'),
};



/* tslint:disable:max-classes-per-file */
/**
 * An ngrx action to add an notification to the cache
 */
export class AddToNotificationCacheAction implements Action {
  type = NotificationCacheActionTypes.ADD;
  payload: {
    notification: Notification;
  };

  /**
   * Create a new AddToNotificationCacheAction
   *
   * @param notificationToCache
   *    the notification to add
   * @param timeAdded
   *    the time it was added
   * @param msToLive
   *    the amount of milliseconds before it should expire
   * @param requestHref
   *    The href of the request that resulted in this notification
   *    This isn't necessarily the same as the notification's self
   *    link, it could have been part of a list for example
   */
  constructor(notification: Notification) {
    this.payload = { notification: notification };
  }
}

/**
 * An ngrx action to remove an notification from the cache
 */
export class RemoveFromNotificationCacheAction implements Action {
  type = NotificationCacheActionTypes.REMOVE;
  payload: string;

  /**
   * Create a new RemoveFromNotificationCacheAction
   *
   * @param uuid
   *    the UUID of the notification to remove
   */
  constructor(uuid: string) {
    this.payload = uuid;
  }
}

/**
 * A type to encompass all NotificationCacheActions
 */
export class UpdateStatusAction implements Action {
  type = NotificationCacheActionTypes.UPDATE_STATUS;
  payload:{
    uuid:string,
    state:string;
  }
  constructor(uuid: string, state:string){
    this.payload = {
      uuid : uuid,
      state : state
    }
  }
}

export type NotificationCacheAction
  = AddToNotificationCacheAction
  | RemoveFromNotificationCacheAction
  | UpdateStatusAction;

