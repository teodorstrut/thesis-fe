import { NotificationType } from '../enums/notification-type.enum';

export class NotificationModel {
  public notificationType: NotificationType;
  public target: string;
  public navigationLink: string;
  public seen: boolean;
  public id: number;
}
