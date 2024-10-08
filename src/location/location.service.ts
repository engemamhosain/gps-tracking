// src/locations/location.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  // Create a new location
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = this.locationRepository.create(createLocationDto);
    return await this.locationRepository.save(location);
  }

  // Find locations by device serial number
  async findByDeviceSerialNumber(deviceSerialNumber: string): Promise<Location[]> {
    return await this.locationRepository.find({
      where: { device_serial_number: deviceSerialNumber },
    });
  }

  // Get all locations
  async findAll(): Promise<Location[]> {
    return await this.locationRepository.find();
  }
}
