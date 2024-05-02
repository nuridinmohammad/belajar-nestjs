import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [CommonModule, UserModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
