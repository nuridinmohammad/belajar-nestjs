import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  user_id: number;
}
