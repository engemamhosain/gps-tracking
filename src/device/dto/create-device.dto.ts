import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({ example: 'GPS Tracker' })
  @IsString()
  @IsNotEmpty()
  device_name: string;

  @ApiProperty({ example: 'SN1234567890' })
  @IsString()
  @IsNotEmpty()
  device_serial_number: string;

  @ApiProperty({ example: 'name' })
  @IsString()
  @IsNotEmpty()
  vehicle_name: string;

  @ApiProperty({ example: '1444244444' })
  @IsString()
  @IsNotEmpty()
  vehicle_number: string;


  @ApiProperty({ example: 'car' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['bike', 'car'])
  vehicle_type: 'bike' | 'car';

}
