import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum Gender {
  PRIA = 'PRIA',
  PEREMPUAN = 'PEREMPUAN',
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
