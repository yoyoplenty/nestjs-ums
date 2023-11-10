import { google } from 'googleapis';
import { Injectable } from '@nestjs/common';
import { GoogleOauthService } from '../google-oauth/google-oauth.service';
import { AddEventToCalenderDto } from './dto/add-event.dto';
import { oAuth2Client } from '../../utils';

@Injectable()
export class CalenderService {
  private calendar = google.calendar('v3');

  constructor(private readonly googleOauthService: GoogleOauthService) {}

  async addEvent(addEventPayload: AddEventToCalenderDto, accessToken: string) {
    oAuth2Client.setCredentials({ access_token: accessToken });

    const { summary, description, start, end } = addEventPayload;

    const event = {
      summary: 'Google I/O 2015',
      location: '800 Howard St., San Francisco, CA 94103',
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: '2023-11-10T09:16:00-00:00',
        timeZone: 'Africa/Lagos',
      },
      end: {
        dateTime: '2023-11-10T17:17:00-00:00',
        timeZone: 'Africa/Lagos',
      },
      recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
      attendees: [{ email: 'yoyoplento@gmail.com' }, { email: 'blessingadebiyi1998@gmail.com' }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    const createdEvent: any = await this.calendar.events.insert({
      auth: oAuth2Client,
      calendarId: 'primary',
      requestBody: event,
    });

    return { data: await createdEvent.data, message: `events created successfully` };
  }

  async getCalender(accessToken: string) {
    oAuth2Client.setCredentials({ access_token: accessToken });

    const events: any = await this.calendar.calendars.get({
      auth: oAuth2Client,
      calendarId: 'primary',
    });

    return { data: events.data, message: `calender fetched successfully` };
  }

  async getEvents(accessToken: string) {
    oAuth2Client.setCredentials({ access_token: accessToken });

    const events: any = await this.calendar.events.list({
      auth: oAuth2Client,
      calendarId: 'primary',
    });

    return { data: events.data, message: `events fetched successfully` };
  }
}
