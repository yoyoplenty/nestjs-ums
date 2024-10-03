import { Response } from 'express';
import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ErrorResponse, JsonResponse } from '../../handlers/responses/response';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FileDto } from 'src/utils/dto/file.dto';
import { BankService } from './bank.service';

@ApiTags('Banks')
@Controller('api/v1/banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get('/export')
  async export(@Res() res: Response) {
    try {
      const response = await this.bankService.export();

      return res.sendFile(`${response}`);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  @Post('migrate')
  async migrate(@Body() filePayload: FileDto, @Res() res: Response) {
    try {
      const response = await this.bankService.migrate(filePayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
