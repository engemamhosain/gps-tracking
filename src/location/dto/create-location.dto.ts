// src/locations/dto/create-location.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber,IsString } from 'class-validator';

export class CreateLocationDto {

  @ApiProperty({ example: 'SN1234567890' })
  @IsString()    
  @IsNotEmpty()
  device_serial_number: string; // This must match the serial number in the Device entity

  @ApiProperty({ example: '23.7128' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ example: '90.7128' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
