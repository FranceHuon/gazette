import { Module } from '@nestjs/common'
import { ContentModule } from '@/modules/content/content.module'
import { JobService } from './job.service'

@Module({
  imports: [ContentModule],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
