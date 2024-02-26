// import { Request, Response } from 'express';
// import { Controller, Get, Req, Res } from '@nestjs/common';
// import { GoogleOauthService } from './google-oauth.service';
// import { ResponseDTO } from '../../utils/dto/response.dto';
// import { ErrorResponse, JsonResponse } from '../../handlers/responses/response';

// @Controller('oauth')
// export class GoogleOauthController {
//   constructor(private readonly googleOauthService: GoogleOauthService) {}

//   @Get()
//   async oauth(@Res() res: Response) {
//     try {
//       const response = await this.googleOauthService.getGoogleAuth();

//       res.redirect(response);
//     } catch (error) {
//       return ErrorResponse(res, error);
//     }
//   }

//   @Get('callback')
//   async oauthCallback(@Req() req: Request, @Res() res: Response): Promise<ResponseDTO> {
//     try {
//       const response = await this.googleOauthService.getAccessToken(req.query.code);

//       return JsonResponse(res, response);
//     } catch (error) {
//       return ErrorResponse(res, error);
//     }
//   }

//   @Get('success')
//   async stripeCallback(@Req() req: Request | any, @Res() res: Response): Promise<ResponseDTO> {
//     try {
//       const response = await this.googleOauthService.getSessionDetails(req.query.session_id);

//       return JsonResponse(res, response);
//     } catch (error) {
//       return ErrorResponse(res, error);
//     }
//   }
// }
