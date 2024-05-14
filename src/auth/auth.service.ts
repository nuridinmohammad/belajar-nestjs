import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { PrismaService } from 'src/db/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AccessKeyDto } from './dto/access-key.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup(signupDto: SignupDto) {
    const checkUserSame = await this.prismaService.user.findFirst({
      where: {
        email: signupDto.email,
      },
    });
    if (checkUserSame) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    const randomUUID = crypto.randomUUID();
    const salt = await bcrypt.genSalt(10);
    // const hashedApiKey = await bcrypt.hash(randomUUID, salt);
    const password = await bcrypt.hash(signupDto.password, salt);

    return this.prismaService.user.create({
      data: { ...signupDto, api_key: randomUUID, password },
      select: {
        id: true,
        email: true,
        api_key: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getAccessKey(accessKeyDto: AccessKeyDto): Promise<{ api_key: string }> {
    const foundUser = await this.prismaService.user.findFirst({
      where: { email: accessKeyDto.email },
    });

    if (!foundUser) {
      throw new UnauthorizedException('You do not have access!');
    }

    const isHasAccess = await bcrypt.compare(
      accessKeyDto.password,
      foundUser.password,
    );

    if (isHasAccess) return { api_key: foundUser.api_key };
    else throw new UnauthorizedException('You do not have access!');
  }
}
