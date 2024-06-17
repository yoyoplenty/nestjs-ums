import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { ResponseDTO } from './../../utils/dto/response.dto';
import { CreateUserPipe } from './validation/create-user.validation';
import { ErrorResponse, JsonResponse } from './../../handlers/responses/response';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FileDto } from 'src/utils/dto/file.dto';

@ApiTags('Users')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(CreateUserPipe) createUserDto: CreateUserDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.userService.create(createUserDto);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Get('/export')
  async export(@Res() res: Response) {
    try {
      const response = await this.userService.export();

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
      const response = await this.userService.migrate(filePayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Get()
  async findAll(@Query() query: QueryUserDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.userService.findAllAndSearch(query);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.userService.findById(id);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.userService.update(id, updateUserDto);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.userService.delete(id);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
