// src/geofences/geofence.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { GeofenceService } from './geofence.service';
import { CreateGeofenceDto } from './dto/create-geofence.dto';
import { Geofence } from './entities/geofence.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Device } from 'src/device/entities/device.entity';
import { DeviceService } from 'src/device/device.service';

@ApiTags('geofences')
@Controller('geofences')
@UseGuards(JwtAuthGuard) // Require JWT authentication
@ApiBearerAuth('access-token')
export class GeofenceController {
  constructor(private readonly geofenceService: GeofenceService,private readonly deviceService: DeviceService) {}

  // Create a new geofence
  @Post()
  async create(@Body() createGeofenceDto: CreateGeofenceDto,@GetUser() user: User): Promise<Geofence> {     

    const device = await this.deviceService.findOneBySerialNumber(createGeofenceDto.device_serial_number,user)

    return this.geofenceService.create(createGeofenceDto,device);
  }

  // Get all geofences
  @Get()    
  async findAll(): Promise<Geofence[]> {
    return this.geofenceService.findAll();
  }

  // Check if a device is within a geofence
  @Get(':deviceSerialNumber/within')
  async isWithinGeofence(
    @Param('deviceSerialNumber') deviceSerialNumber: string,
    @Body() body: { latitude: number; longitude: number },
  ): Promise<{ within: boolean }> {
    const within = await this.geofenceService.isWithinGeofence(deviceSerialNumber, body.latitude, body.longitude);
    return { within };
  }
}
