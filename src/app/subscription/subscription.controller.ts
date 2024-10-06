import { Response } from 'express';
import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ErrorResponse, JsonResponse } from '../../handlers/responses/response';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FileDto } from 'src/utils/dto/file.dto';
import { SubscriptionService } from './subscription.service';

@ApiTags('Subscriptions')
@Controller('api/v1/subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
}
