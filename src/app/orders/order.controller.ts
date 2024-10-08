import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ErrorResponse, JsonResponse } from '../../handlers/responses/response';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FileDto } from 'src/utils/dto/file.dto';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/export')
  async export(@Res() res: Response) {
    try {
      const response = await this.orderService.export();

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
      const response = await this.orderService.migrate(filePayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
