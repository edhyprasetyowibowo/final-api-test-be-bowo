import { Module } from '@nestjs/common';
import { FaqController } from './controllers';
import { FaqService } from './services';
import { FaqRepository } from './repositories';

@Module({
  controllers: [FaqController],
  providers: [FaqService, FaqRepository],
  exports: [FaqRepository, FaqRepository],
})
export class FaqModule {}
