import { Action } from '@ngrx/store';

import { type } from '../../shared/ngrx/type';
import { Notification } from '../../notification/notification.model';

/**
 * The list of NotificationAction type definitions
 */
export const NotificationActionTypes = {
  ADD: type('dspace/core/notification/ADD'),
  REMOVE: type('dspace/core/notification/REMOVE'),
  UPDATE_STATUS: type('dspace/core/notification/UPDATE_STATUS'),
  INITIALISE_CLOSE_TIMEOUT: type('dspace/core/notification/INITIALISE_CLOSE_TIMEOUT'),
};



/* tslint:disable:max-classes-per-file */
/**
 * An ngrx action to add an notification
 */
export class AddNotificationAction implements Action {
  type = NotificationActionTypes.ADD;
  payload: {
    notification: Notification;
  };

  /**
   * Create a new AddNotificationAction
   *
   * @param notification
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
 * An ngrx action to remove a notification
 */
export class RemoveNotificationAction implements Action {
  type = NotificationActionTypes.REMOVE;
  payload: string;

  /**
   * Create a new RemoveNotificationAction
   *
   * @param uuid
   *    the UUID of the notification to remove
   */
  constructor(uuid: string) {
    this.payload = uuid;
  }
}

/**
 * A type to encompass all NotificationActions
 */
export class UpdateStatusAction implements Action {
  type = NotificationActionTypes.UPDATE_STATUS;
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
/**
 * A type to encompass all NotificationActions
 */
export class InitializeCloseTimeoutAction implements Action {
  type = NotificationActionTypes.INITIALISE_CLOSE_TIMEOUT;
  payload: {
    notification: Notification;
  };
  constructor(notification: Notification) {
    this.payload = { notification: notification};
  }
}

export type NotificationAction
  = AddNotificationAction
  | RemoveNotificationAction
  | UpdateStatusAction
  | InitializeCloseTimeoutAction;

