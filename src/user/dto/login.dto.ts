import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'emam' })
  @IsString()
  username: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;
}
