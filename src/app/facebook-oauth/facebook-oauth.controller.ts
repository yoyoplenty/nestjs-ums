import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { FacebookOauthService } from './facebook-oauth.service';
import { ResponseDTO } from './../../utils/dto/response.dto';
import { ErrorResponse, JsonResponse } from './../../handlers/responses/response';

@Controller('oauth')
export class FacebookOauthController {
  constructor(private readonly facebookOauthService: FacebookOauthService) {}

  @Get()
  async oauth(@Res() res: Response) {
    try {
      const response = await this.facebookOauthService.getFbAuth();

      res.redirect(response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Get('callback')
  async oauthCallback(@Req() req: Request, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.facebookOauthService.getAccessToken(req.query.code);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Get('users')
  async getUsers(@Req() req: Request, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const token = 'y29bmts5qbqce77kyumxt59lhvquov';

      const response = await this.facebookOauthService.getUserDetails(token);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Get('users/broadcasts')
  async getUsersB(@Req() req: Request, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const token = '7ne77ctbrg8lgi2wrfnjuxtzzrxiac';

      const response = await this.facebookOauthService.getUserBroadcasts(token);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Get('users/create-broadcasts')
  async createBroadcastSchedule(@Req() req: Request, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const token = '7ne77ctbrg8lgi2wrfnjuxtzzrxiac';

      const response = await this.facebookOauthService.createBroadcasts(token);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
