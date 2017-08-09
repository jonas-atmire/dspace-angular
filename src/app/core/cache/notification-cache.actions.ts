import { Action } from '@ngrx/store';

import { type } from '../../shared/ngrx/type';
import { CacheableNotification } from './notification-cache.reducer';

/**
 * The list of NotificationCacheAction type definitions
 */
export const NotificationCacheActionTypes = {
  ADD: type('dspace/core/cache/notification/ADD'),
  REMOVE: type('dspace/core/cache/notification/REMOVE'),
};



/* tslint:disable:max-classes-per-file */
/**
 * An ngrx action to add an notification to the cache
 */
export class AddToNotificationCacheAction implements Action {
  type = NotificationCacheActionTypes.ADD;
  payload: {
    notificationTOCache: CacheableNotification;
    timeAdded: number;
    msToLive: number;
    requestHref: string;
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
  constructor(notificationToCache: CacheableNotification, timeAdded: number, msToLive: number, requestHref: string) {
    this.payload = { notificationTOCache: notificationToCache, timeAdded, msToLive, requestHref };
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
export type NotificationCacheAction
  = AddToNotificationCacheAction
  | RemoveFromNotificationCacheAction;
