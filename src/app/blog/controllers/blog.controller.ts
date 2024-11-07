import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BlogService } from '../services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateBlogDto, UpdateBlogDto } from '../dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/auth';

@ApiTags('Blog')
@ApiSecurity('JWT')
@Controller({
  path: 'blog',
  version: '1',
})
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(AuthGuard)
  public async create(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    try {
      const { name } = req.user;
      const data = await this.blogService.create({
        ...createBlogDto,
        author: name,
      });
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('public')
  public async publicIndex(@Query() paginateDto: PaginationQueryDto) {
    try {
      const data = await this.blogService.paginate(paginateDto);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  public async index(@Query() paginateDto: PaginationQueryDto) {
    try {
      const data = await this.blogService.paginate(paginateDto);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
