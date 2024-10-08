// src/geofences/geofence.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Geofence } from './entities/geofence.entity';
import { CreateGeofenceDto } from './dto/create-geofence.dto';
import { User } from 'src/user/entities/user.entity';
import { Device } from 'src/device/entities/device.entity';

@Injectable()
export class GeofenceService {
  constructor(
    @InjectRepository(Geofence)
    private geofenceRepository: Repository<Geofence>,
  ) {}

  // Create a new geofence
  async create(createGeofenceDto: CreateGeofenceDto,devices:Device): Promise<Geofence> {

    const { device_serial_number,latitude,longitude,radius } = createGeofenceDto;

    const geofence = this.geofenceRepository.create({
        latitude,
        longitude,
        radius,
      device_serial_number,
      devices, // Associate the device with the user
    });

    console.log(geofence)


    return await this.geofenceRepository.save(geofence);

   
    
  }

  // Get all geofences
  async findAll(): Promise<Geofence[]> {
    return await this.geofenceRepository.find();
  }

  // Check if a point is within a geofence
  async isWithinGeofence(deviceSerialNumber: string, latitude: number, longitude: number): Promise<boolean> {
    const geofences = await this.geofenceRepository.find({
      where: { device_serial_number: deviceSerialNumber },
    });

    for (const geofence of geofences) {
      const distance = this.calculateDistance(latitude, longitude, geofence.latitude, geofence.longitude);
      if (distance <= geofence.radius) {
        return true; // Inside the geofence
      }
    }

    return false; // Outside all geofences
  }

  // Calculate distance between two latitude/longitude points (Haversine formula)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Radius of Earth in meters
    const φ1 = (lat1 * Math.PI) / 180; // Convert to radians
    const φ2 = (lat2 * Math.PI) / 180; // Convert to radians
    const Δφ = ((lat2 - lat1) * Math.PI) / 180; // Convert to radians
    const Δλ = ((lon2 - lon1) * Math.PI) / 180; // Convert to radians

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }
}
