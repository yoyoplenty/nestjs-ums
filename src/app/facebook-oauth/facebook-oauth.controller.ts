import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { FacebookOauthService } from './facebook-oauth.service';
import { ResponseDTO } from './../../utils/dto/response.dto';
import { ErrorResponse, JsonResponse } from './../../handlers/responses/response';

@Controller('api/v1/fb-oauth')
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
      const response = await this.facebookOauthService.getRedirect(req.query.code);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
