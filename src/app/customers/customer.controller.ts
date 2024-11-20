import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ErrorResponse, JsonResponse } from '../../handlers/responses/response';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FileDto } from 'src/utils/dto/file.dto';
import { CustomerService } from './customer.service';

@ApiTags('Customers')
@Controller('api/v1/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/export')
  async export(@Res() res: Response) {
    try {
      const response = await this.customerService.export();

      return res.sendFile(`${response}`);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  // @ApiConsumes('multipart/form-data')
  // @FormDataRequest()
  @Post('migrate/:storeId')
  async migrate(@Param('storeId') storeId: string, @Res() res: Response) {
    try {
      const response = await this.customerService.migrate(storeId);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
