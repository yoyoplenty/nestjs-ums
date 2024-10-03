import { Response } from 'express';
import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ErrorResponse, JsonResponse } from '../../handlers/responses/response';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FileDto } from 'src/utils/dto/file.dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/export')
  async export(@Res() res: Response) {
    try {
      const response = await this.productService.export();

      return res.sendFile(`${response}`);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Get('/export/image')
  async exportImages(@Res() res: Response) {
    try {
      const response = await this.productService.exportImages();

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
      const response = await this.productService.migrate(filePayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
