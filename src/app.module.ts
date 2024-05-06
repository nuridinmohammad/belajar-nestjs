import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ProjectModule } from './project/project.module';
import { EmployeeModule } from './employee/employee.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [CommonModule, ProjectModule, EmployeeModule, ActivityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
