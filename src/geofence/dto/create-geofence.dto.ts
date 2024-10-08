// src/geofences/dto/create-geofence.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGeofenceDto {

    @ApiProperty({ description: 'Device name' })
    @IsNotEmpty()
    name: string;

  @ApiProperty({ description: 'Device serial number' })
  @IsNotEmpty()
  device_serial_number: string;

  @ApiProperty({ description: 'Latitude of the geofence center' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the geofence center' })
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: 'Radius of the geofence in meters' })
  @IsNumber()
  radius: number; // Radius in meters
}
