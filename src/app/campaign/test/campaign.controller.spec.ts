import { Test, TestingModule } from '@nestjs/testing';
import { CampaignController } from '../campaign.controller';
import { CampaignService } from '../campaign.service';

describe('CampaignController', () => {
  let controller: CampaignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [CampaignService],
    }).compile();

    controller = module.get<CampaignController>(CampaignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
