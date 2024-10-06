import { Response } from 'express';
import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ErrorResponse, JsonResponse } from '../../handlers/responses/response';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FileDto } from 'src/utils/dto/file.dto';
import { PlanService } from './plan.service';

@ApiTags('Plans')
@Controller('api/v1/plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}
}
