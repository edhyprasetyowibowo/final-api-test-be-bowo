import { Injectable } from '@nestjs/common';
import { FaqRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
@Injectable()
export class FaqService {
  constructor(private readonly faqRepository: FaqRepository) {}

  public list() {
    return this.faqRepository.list();
  }
}
