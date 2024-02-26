// import { Request } from 'express';
// import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, BadRequestException } from '@nestjs/common';
// import { CalenderService } from './calender.service';
// import { ResponseDTO } from './../../utils/dto/response.dto';
// import { ErrorResponse, JsonResponse } from './../../handlers/responses/response';
// import { AddEventToCalenderDto } from './dto/add-event.dto';

// @Controller('api/v1/calendars')
// export class CalenderController {
//   constructor(private readonly calenderService: CalenderService) {}

//   @Post('add-event')
//   async addEvent(
//     @Body() addEventPayload: AddEventToCalenderDto,
//     @Res() res: Response,
//     @Req() req: Request,
//   ): Promise<ResponseDTO> {
//     try {
//       const token = req.headers['authorization'];
//       if (!token) throw new BadRequestException('token cannot be empty');

//       const response = await this.calenderService.addEvent(addEventPayload, token);

//       return JsonResponse(res, response);
//     } catch (error) {
//       return ErrorResponse(res, error);
//     }
//   }

//   @Get()
//   async getCalender(@Res() res: Response, @Req() req: Request): Promise<ResponseDTO> {
//     try {
//       const token = req.headers['authorization'];
//       if (!token) throw new BadRequestException('token cannot be empty');

//       const response = await this.calenderService.getCalender(token);

//       return JsonResponse(res, response);
//     } catch (error) {
//       return ErrorResponse(res, error);
//     }
//   }

//   @Get('events')
//   async getEvents(
//     //TODO this should be a query
//     @Res() res: Response,
//     @Req() req: Request,
//   ): Promise<ResponseDTO> {
//     try {
//       const token = req.headers['authorization'];
//       if (!token) throw new BadRequestException('token cannot be empty');

//       const response = await this.calenderService.getEvents(token);

//       return JsonResponse(res, response);
//     } catch (error) {
//       return ErrorResponse(res, error);
//     }
//   }
// }
