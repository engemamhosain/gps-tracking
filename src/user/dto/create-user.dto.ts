import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {

 @ApiProperty({ example: 'emam' })  
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['user', 'admin'])
  user_type: 'user' | 'admin';
}
