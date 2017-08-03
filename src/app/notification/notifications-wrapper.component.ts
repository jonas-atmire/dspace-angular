import { Component,  OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

@Component({
  selector: 'ds-notifications-wrapper',
  styleUrls: ['./notifications-wrapper.component.css'],
  templateUrl: './notifications-wrapper.component.html',
})
export class NotificationsWrapperComponent implements OnInit{

  notifications : Observable<Notification[]>;

  constructor(private notificationService : NotificationService){
  }

  ngOnInit(): void {
    this.notifications = this.notificationService.notifications;
  }

}
