import { combineReducers } from '@ngrx/store';

import { ResponseCacheState, responseCacheReducer } from './response-cache.reducer';
import { ObjectCacheState, objectCacheReducer } from './object-cache.reducer';
import { NotificationCacheState, notificationReducer } from './notification-cache.reducer';

export interface CacheState {
  response: ResponseCacheState,
  object: ObjectCacheState,
  notification: NotificationCacheState
}

export const reducers = {
  response: responseCacheReducer,
  object: objectCacheReducer,
  notification: notificationReducer
};

export function cacheReducer(state: any, action: any) {
  return combineReducers(reducers)(state, action);
}
