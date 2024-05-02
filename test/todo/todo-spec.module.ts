import { Module } from '@nestjs/common';
import { TodoServiceTest } from './todo-spec.service';
import { UserModuleTest } from '../user/user-spec.module';

@Module({
  providers: [TodoServiceTest],
  imports: [UserModuleTest],
})
export class TodoModuleTest {}
