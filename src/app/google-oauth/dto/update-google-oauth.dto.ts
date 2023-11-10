import { PartialType } from '@nestjs/swagger';
import { CreateGoogleOauthDto } from './create-google-oauth.dto';

export class UpdateGoogleOauthDto extends PartialType(CreateGoogleOauthDto) {}
