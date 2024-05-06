import { Module } from '@nestjs/common';
import { EmployeeServiceTest } from './employee-spec.service';

@Module({
  providers: [EmployeeServiceTest],
  exports: [EmployeeServiceTest],
})
export class EmployeeModuleTest {}
