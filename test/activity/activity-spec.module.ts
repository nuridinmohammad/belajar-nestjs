import { Module } from '@nestjs/common';
import { EmployeeServiceTest } from './activity-spec.service';

@Module({
  providers: [EmployeeServiceTest],
  exports: [EmployeeServiceTest],
})
export class EmployeeModuleTest {}
