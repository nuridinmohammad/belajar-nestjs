import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt-config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(request: RegisterDto) {
    const checkUserExists = await this.prismaService.user.findFirst({
      where: {
        email: request.email,
      },
    });

    if (checkUserExists) {
      throw new HttpException('User already registered', HttpStatus.FOUND);
    }
    request.password = await bcrypt.hash(request.password, 12);
    const createUser = await this.prismaService.user.create({
      data: request,
    });

    if (createUser) {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Register Successfull',
      };
    }
  }

  async login(request: LoginDto) {
    const checkUserExists = await this.prismaService.user.findFirst({
      where: {
        email: request.email,
      },
    });

    if (!checkUserExists) {
      throw new HttpException(
        'Email or password is wrong!',
        HttpStatus.NOT_FOUND,
      );
    }

    const checkPassword = await bcrypt.compare(
      request.password,
      checkUserExists.password,
    );

    if (!checkPassword) {
      throw new HttpException(
        'Email or password is wrong!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const accessToken = this.generateJWT({
      sub: checkUserExists.id,
      name: checkUserExists.name,
      email: checkUserExists.email,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Login Berhasil',
      accessToken: accessToken,
    };
  }

  generateJWT(payload: object) {
    return this.jwtService.sign(payload, {
      secret: jwtConfig.secret,
      expiresIn: jwtConfig.expired,
    });
  }

  async profile(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        avatar: true,
        Task: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  async uploadAvatar(id: number, avatar: string) {
    const checkUserExists = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });

    if (checkUserExists) {
      const updateAvatar = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          avatar: avatar,
        },
      });
      if (updateAvatar) {
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Upload avatar berhasil',
          avatar: updateAvatar.avatar,
        };
      }
    }

    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
}
