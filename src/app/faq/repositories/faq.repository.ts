import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

@Injectable()
export class FaqRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async list() {
    const data = await this.prismaService.faq.findMany();

    return data;
  }
}
