import { ObjectId } from 'mongodb';

export interface iAvailability {
  mentorId: ObjectId;
  Availability: [iWeeklyAvailability];
}

export type iWeeklyAvailability = {
  week: number;
  custom: [iDailyAvailability];
  recurring: [iDailyAvailability];
};

export type iDailyAvailability = {
  day: string;
  availabilityTime: [string]; //* ["08:00 AM - 09:00 AM", "10:00 AM - 11:00 AM"]
};

const availability = [
  {
    week: 1,
    custom: [
      {
        day: 'Monday',
        availabilityTime: ['08:00 AM - 09:00 AM', '10:00 AM - 11:00 AM'],
      },
      {
        day: 'Wednesday',
        availabilityTime: ['08:00 AM - 09:00 AM', '10:00 AM - 11:00 AM'],
      },
      {
        day: 'Saturday',
        availabilityTime: ['08:00 AM - 09:00 AM', '10:00 AM - 11:00 AM'],
      },
    ],
    recurring: [
      {
        day: 'Monday',
        availabilityTime: ['09:00 AM - 10:00 AM', '01:00 PM - 02:00 PM'],
      },
      {
        day: 'Wednesday',
        availabilityTime: ['08:00 AM - 09:00 AM'],
      },
      {
        day: 'Friday',
        availabilityTime: ['08:00 AM - 09:00 AM'],
      },
    ],
  },
  {
    week: 2,
    custom: [
      {
        day: 'Monday',
        availabilityTime: ['08:00 AM - 09:00 AM', '10:00 AM - 11:00 AM'],
      },
      {
        day: 'Wednesday',
        availabilityTime: ['08:00 AM - 09:00 AM', '10:00 AM - 11:00 AM'],
      },
      {
        day: 'Saturday',
        availabilityTime: ['08:00 AM - 09:00 AM', '10:00 AM - 11:00 AM'],
      },
    ],
    recurring: [
      {
        day: 'Monday',
        availabilityTime: ['09:00 AM - 10:00 AM', '01:00 PM - 02:00 PM'],
      },
      {
        day: 'Wednesday',
        availabilityTime: ['08:00 AM - 09:00 AM'],
      },
      {
        day: 'Friday',
        availabilityTime: ['08:00 AM - 09:00 AM'],
      },
    ],
  },
];

console.log(availability);
