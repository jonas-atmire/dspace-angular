import { ServerConfig } from './server-config.interface';
import { CacheConfig } from './cache-config.interface';
import { UniversalConfig } from './universal-config.interface';
import { NotificationConfig } from './notification-config.interface';

export interface GlobalConfig {
  ui: ServerConfig;
  rest: ServerConfig;
  production: boolean;
  cache: CacheConfig;
  universal: UniversalConfig;
  logDirectory: string;
  prerenderStrategy: string;
  debug: boolean;
  notification: NotificationConfig
}
