import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateBlogDto {
  @ApiProperty()
  @IsString({
    message: i18nValidationMessage('validation.string'),
  })
  title: string;

  @ApiProperty()
  @IsString({
    message: i18nValidationMessage('validation.string'),
  })
  content: string;

  @ApiProperty()
  @IsString({
    message: i18nValidationMessage('validation.string'),
  })
  imageUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.string'),
  })
  author?: string; 
}
