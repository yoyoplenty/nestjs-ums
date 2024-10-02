import { Response } from 'express';
import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ErrorResponse, JsonResponse } from '../../handlers/responses/response';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FileDto } from 'src/utils/dto/file.dto';
import { TransactionService } from './transaction.service';

@ApiTags('Transactions')
@Controller('api/v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/export')
  async export(@Res() res: Response) {
    try {
      const response = await this.transactionService.export();

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
      const response = await this.transactionService.migrate(filePayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
