import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './entities/location.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('location')
export class LocationController {

    constructor(private readonly locationService: LocationService) {}

    // Create a new location
    @Post()
    async create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
      return this.locationService.create(createLocationDto);
    }
  
    // Get locations by device serial number
    @UseGuards(JwtAuthGuard)
    @Get(':deviceSerialNumber')
    async findByDeviceSerialNumber(@Param('deviceSerialNumber') deviceSerialNumber: string): Promise<Location[]> {
      return this.locationService.findByDeviceSerialNumber(deviceSerialNumber);
    }
  
    // Get all locations
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Location[]> {
      return this.locationService.findAll();
    }
}
