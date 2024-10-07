import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {

 @ApiProperty({ example: 'john_doe' })  
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'P@ssw0rd!' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['user', 'admin'])
  user_type: 'user' | 'admin';
}
