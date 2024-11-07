import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

type Filter = {
  where?: Prisma.BlogWhereInput;
  orderBy?: Prisma.BlogOrderByWithRelationInput;
  cursor?: Prisma.BlogWhereUniqueInput;
  take?: number;
  skip?: number;
};

@Injectable()
export class BlogRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    const [data, count] = await this.prismaService.$transaction([
      this.prismaService.blog.findMany({
        skip: (+page - 1) * +limit,
        take: +limit,
        ...filter,
      }),
      this.prismaService.blog.count(),
    ]);

    return new PaginatedEntity(data, {
      limit,
      page,
      totalData: count,
    });
  }

  public async create(data: Prisma.BlogCreateInput) {
    return this.prismaService.blog.create({ data });
  }

  public async update(
    where: Prisma.BlogWhereUniqueInput,
    data: Prisma.BlogUpdateInput,
  ) {
    return this.prismaService.blog.update({ where, data });
  }

  public async delete(where: Prisma.BlogWhereUniqueInput) {
    return this.prismaService.blog.update({
      where,
      data: { deletedAt: new Date() },
    });
  }

  public async first(
    where: Partial<Prisma.BlogWhereUniqueInput>,
    select?: Prisma.BlogSelect,
  ) {
    return this.prismaService.blog.findFirst({ where, select });
  }

  public async firstOrThrow(
    where: Partial<Prisma.BlogWhereUniqueInput>,
    select?: Prisma.BlogSelect,
  ) {
    const data = await this.prismaService.blog.findFirst({ where, select });
    if (!data) throw new Error('data.not_found');
    return data;
  }

  public async find(filter: Omit<Filter, 'include'>) {
    return this.prismaService.blog.findMany(filter);
  }

  public async count(filter: Omit<Filter, 'include'>) {
    return this.prismaService.blog.count(filter);
  }

  public async any(filter: Omit<Filter, 'include'>) {
    return (await this.prismaService.blog.count(filter)) > 0;
  }
}
