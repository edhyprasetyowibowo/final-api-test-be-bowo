import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { FaqService } from '../services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Faq')
@Controller({
  path: 'faq',
  version: '1',
})
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  public async index() {
    try {
      const data = await this.faqService.list();
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
