// src/geofences/geofence.entity.ts
import { Device } from 'src/device/entities/device.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Geofence {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  name: string; // The device associated with this geofence


  @Column()
  device_serial_number: string; // The device associated with this geofence

  @Column('float')
  latitude: number; // Center point latitude of the geofence

  @Column('float')
  longitude: number; // Center point longitude of the geofence

  @Column('float')
  radius: number; // Radius of the geofence in meters

  @CreateDateColumn()
  created_at: Date; // Timestamp of creation

  @ManyToOne(() => Device, device => device.geofence, { onDelete: 'CASCADE' }) // A user can have multiple devices
  devices: Device;
}
