import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  InitializeCloseTimeoutAction, NotificationActionTypes,
  UpdateStatusAction
} from '../../core/cache/notification.actions';
import { Notification } from '../notification.model';
import { NotificationState } from '../../core/cache/notification.reducer';
import { Store } from '@ngrx/store';

/**
 * Effect that is triggered when a notification has a timeout set.
 * After the set timeout, the "UpdateStatusAction" to close the notification is dispatched
 */
@Injectable()
export class TimeOutClosingEffect {
  @Effect({dispatch:false})close$ = this.actions$
    .ofType(NotificationActionTypes.INITIALISE_CLOSE_TIMEOUT).map((action) => {
        let notification:Notification =(<InitializeCloseTimeoutAction>action).payload.notification;
        setTimeout(() => {
          this.store.dispatch(new UpdateStatusAction(notification.id, 'closing'));
        }, notification.timeout);
      }
    );

  constructor(private actions$: Actions, private store : Store<NotificationState>) {
  }
}
