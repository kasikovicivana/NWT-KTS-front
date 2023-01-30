export interface NotificationModel {
  id: number;
  message: string;
  dateTime: string;
  driveId: number;
  reason: string;
  receiverEmail: string;
  approvedPayment: boolean;
}
