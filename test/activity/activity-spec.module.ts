import { Module } from '@nestjs/common';
import { ActivityServiceTest } from './activity-spec.service';

@Module({
  providers: [ActivityServiceTest],
  exports: [ActivityServiceTest],
})
export class ActivityModuleTest {}
