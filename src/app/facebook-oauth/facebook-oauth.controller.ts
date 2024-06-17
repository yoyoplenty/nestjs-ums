import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { FacebookOauthService } from './facebook-oauth.service';
import { ResponseDTO } from './../../utils/dto/response.dto';
import { ErrorResponse, JsonResponse } from './../../handlers/responses/response';

@Controller('api/v1/fb-oauth')
// @Controller('oauth')
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

  @Get('zoom')
  async zoomOauth(@Res() res: Response) {
    try {
      const response = await this.facebookOauthService.getZoomAuth();

      res.redirect(response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  /**
   *
   * @param req THIS IS FOR FACEBOOK
   * @param res
   * @returns
   */
  @Get('callback')
  async oauthCallback(@Req() req: Request, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.facebookOauthService.getAccessToken(req.query.code);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  // @Get('callback')
  // async oauthCallback(@Req() req: Request, @Res() res: Response): Promise<ResponseDTO> {
  //   try {
  //     const response = await this.facebookOauthService.getZoomTokens(req.query.code);

  //     return JsonResponse(res, response);
  //   } catch (error) {
  //     return ErrorResponse(res, error);
  //   }
  // }
}
