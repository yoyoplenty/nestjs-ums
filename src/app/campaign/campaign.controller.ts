import { Request } from 'express';
import { Controller, Post, Body, Res, Req, BadRequestException } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { ResponseDTO } from './../../utils/dto/response.dto';
import { ErrorResponse, JsonResponse } from './../../handlers/responses/response';

@Controller('api/v1/campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  async create(
    @Body() createCampaignDto: CreateCampaignDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<ResponseDTO> {
    try {
      const token = req.headers['authorization'];
      if (!token) throw new BadRequestException('token cannot be empty');

      const response = await this.campaignService.create(createCampaignDto, token);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
