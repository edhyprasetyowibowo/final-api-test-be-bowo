import { Module } from '@nestjs/common';
import { BlogController } from './controllers';
import { BlogService } from './services';
import { BlogRepository } from './repositories';

@Module({
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
  exports: [BlogRepository, BlogRepository],
})
export class BlogModule {}
