import { Module } from '@nestjs/common';
import { UserServiceTest } from './user-spec.service';

@Module({
  providers: [UserServiceTest],
  exports: [UserServiceTest],
})
export class UserModuleTest {}
