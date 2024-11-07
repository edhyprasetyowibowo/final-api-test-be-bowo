import { Injectable } from '@nestjs/common';
import { BlogRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateBlogDto, UpdateBlogDto } from '../dtos';
@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return this.blogRepository.paginate(paginateDto);
  }

  public async create(createBlogDto: CreateBlogDto) {
    try {
      return this.blogRepository.create(createBlogDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
