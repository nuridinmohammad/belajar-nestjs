import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Connection, createConnection } from './connection/connection';
import { MailService, mailService } from './mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './user-repository/user-repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      provide: MailService,
      useValue: mailService,
    },
    {
      provide: 'EmailService',
      useExisting: MailService,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
