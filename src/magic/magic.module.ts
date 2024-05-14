import { Module } from '@nestjs/common';
import { MagicService } from './magic.service';
import { MagicController } from './magic.controller';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/db/prisma.module';

@Module({
  providers: [MagicService],
  exports: [],
  controllers: [MagicController],
  imports: [AuthModule, PrismaModule, HttpModule],
})
export class MagicModule {}
