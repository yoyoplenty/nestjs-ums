import { ObjectId } from 'mongodb';

export interface iAvailability {
  mentorId: ObjectId;
  Availability: [iWeeklyAvailability];
}

export type iWeeklyAvailability = {
  week: number;
  timeZone: string;
  custom: [iDailyAvailability];
  recurring: [iDailyAvailability];
};

export type iDailyAvailability = {
  day: number;
  timeRange: [string];
};
