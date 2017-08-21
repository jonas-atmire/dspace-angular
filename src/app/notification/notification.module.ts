import { NgModule } from '@angular/core';

import { NotificationService } from './notification.service';
import { NotificationsWrapperComponent } from './notifications-wrapper.component';
import { NotificationComponent } from './notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    NotificationsWrapperComponent,
    NotificationComponent
  ],
  providers: [ NotificationService ],
  imports: [ BrowserAnimationsModule]
})

export class NotificationModule {
}
