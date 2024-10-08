import { Module } from '@nestjs/common';
import { GeofenceService } from './geofence.service';
import { GeofenceController } from './geofence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geofence } from './entities/geofence.entity';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports: [DeviceModule, TypeOrmModule.forFeature([Geofence])],
  providers: [GeofenceService],
  controllers: [GeofenceController],
  exports: [GeofenceService]
})
export class GeofenceModule {}
