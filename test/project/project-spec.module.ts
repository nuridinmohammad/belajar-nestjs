import { Module } from '@nestjs/common';
import { ProjectServiceTest } from './project-spec.service';

@Module({
  providers: [ProjectServiceTest],
  exports: [ProjectServiceTest],
})
export class ProjectModuleTest {}
