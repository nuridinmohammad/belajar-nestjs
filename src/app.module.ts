import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: [new winston.transports.Console()],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TaskModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
