import {
  Controller,
  Get,
  Header,
  HttpCode,
  Inject,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { Connection } from './connection/connection';
import { MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { User } from '@prisma/client';

@Controller('/api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly connection: Connection,
    private readonly mailService: MailService,
    @Inject('EmailService') private readonly emailService: MailService,
    private readonly userRepository: UserRepository,
  ) {}

  @Get('/create')
  async create(
    @Query('firstname') firstName: string,
    @Query('lastname') lastName: string,
  ): Promise<User> {
    return this.userRepository.save(firstName, lastName);
  }

  @Get('/connection')
  async getConnection(): Promise<string> {
    // this.userRepository.save();
    this.mailService.send();
    this.emailService.send();
    return this.connection.getName();
  }

  @Get()
  getHello(): string {
    return this.userService.sayHello('Nuridin');
  }

  @Post()
  post(): string {
    return 'POST';
  }

  @Get('/sample')
  get(): string {
    return 'Sample';
  }

  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return `Hello, ${name || 'Guest'}`;
  }

  @Get('/sample-response')
  @Header('Content-type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'hello Json',
    };
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() res: Response) {
    res.cookie('name', name);
    res.status(200).send('Succes set cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() req: Request) {
    return req.cookies['name'];
  }

  @Get('view/hello')
  viewHello(@Query('name') name: string, @Res() res: Response) {
    res.render('index.html', {
      title: 'Template Engine',
      name: name,
    });
  }
}
