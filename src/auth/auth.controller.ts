import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @HttpCode(201)
  async register(@Body() request: RegisterDto) {
    return await this.authService.register(request);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() request: LoginDto) {
    return await this.authService.login(request);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard)
  @Get('/profile')
  @HttpCode(200)
  async profile(@Req() request) {
    return await this.authService.profile(request?.user?.id);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'public/uploads/image',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  @Post('/avatar')
  @HttpCode(201)
  async avatar(@Req() request, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.authService.uploadAvatar(
      request?.user?.id,
      `/uploads/image/${file.filename}`,
    );
  }
}
