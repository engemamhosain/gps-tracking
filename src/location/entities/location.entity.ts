// src/locations/location.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Device } from '../../device/entities/device.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => Device, device => device.locations, { onDelete: 'CASCADE' }) // Establishing the relationship
@JoinColumn({ name: 'device_serial_number', referencedColumnName: 'device_serial_number' }) // Specify the foreign key
device: Device; // This sets up the inverse side of the relationship


  @Column({ unique: true })
  device_serial_number: string;


  @Column()
  speed: number;

  @Column()
  engine_status: string;

  @Column()
  engine_locked: number;


  @Column('double')
  latitude: number; // Latitude of the location

  @Column('double')
  longitude: number; // Longitude of the location

  @CreateDateColumn()
  timestamp: Date; // Time when the location was recorded
}
