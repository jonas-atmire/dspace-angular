import { NgModule } from '@angular/core';

import { NotificationService } from './notification.service';
import { NotificationsWrapperComponent } from './notifications-wrapper.component';
import { NotificationComponent } from './notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    NotificationsWrapperComponent,
    NotificationComponent,
    NgbAlert
  ],
  providers: [ NotificationService ],
  imports: [ BrowserAnimationsModule]
})

export class NotificationModule {
}
