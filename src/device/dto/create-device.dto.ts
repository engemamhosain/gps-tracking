import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({ example: 'GPS Tracker' })
  @IsString()
  @IsNotEmpty()
  device_name: string;

  @ApiProperty({ example: 'SN1234567890' })
  @IsString()
  @IsNotEmpty()
  device_serial_number: string;
}
