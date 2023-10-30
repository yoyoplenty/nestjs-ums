import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCampaignDto {
  @MaxLength(1000)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(1000)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  objective: string;

  @MaxLength(1000)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @IsNotEmpty()
  special_ad_categories: [];
}
