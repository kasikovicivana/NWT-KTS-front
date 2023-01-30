export interface ScheduleInfoModel {
  passengers: [string] | undefined;
  carType: string;
  babiesAllowed: boolean;
  petFriendly: boolean;
  price: number;
  splitFaire: boolean;
  reservation: boolean;
}
