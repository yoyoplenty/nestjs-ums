import { PartialType } from '@nestjs/swagger';
import { CreateFacebookOauthDto } from './create-facebook-oauth.dto';

export class UpdateFacebookOauthDto extends PartialType(CreateFacebookOauthDto) {}
