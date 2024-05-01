import { Module } from '@nestjs/common';
import { UserServiceTest } from './user-spec.service';

@Module({
  providers: [UserServiceTest],
})
export class UserModuleTest {}
