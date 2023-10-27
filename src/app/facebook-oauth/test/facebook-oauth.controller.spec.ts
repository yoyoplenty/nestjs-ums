import { Test, TestingModule } from '@nestjs/testing';
import { FacebookOauthController } from '../facebook-oauth.controller';
import { FacebookOauthService } from '../facebook-oauth.service';

describe('FacebookOauthController', () => {
  let controller: FacebookOauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacebookOauthController],
      providers: [FacebookOauthService],
    }).compile();

    controller = module.get<FacebookOauthController>(FacebookOauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
