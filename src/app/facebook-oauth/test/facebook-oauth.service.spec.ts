import { Test, TestingModule } from '@nestjs/testing';
import { FacebookOauthService } from '../facebook-oauth.service';

describe('FacebookOauthService', () => {
  let service: FacebookOauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacebookOauthService],
    }).compile();

    service = module.get<FacebookOauthService>(FacebookOauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
