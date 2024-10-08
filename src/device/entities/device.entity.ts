import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Location } from '../../location/entities/location.entity';
import { Geofence } from 'src/geofence/entities/geofence.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  device_serial_number: string;

  @Column()
  device_name: string;

  @CreateDateColumn() // Automatically sets the created timestamp
  created_at: Date;

  @ManyToOne(() => User, user => user.devices, { onDelete: 'CASCADE' }) // A user can have multiple devices
  user: User;

  @OneToMany(() => Location, Location => Location.device, { onDelete: 'CASCADE' }) // A user can have multiple devices
  locations: Location;

  @OneToMany(() => Geofence, geofence => geofence.devices, { onDelete: 'CASCADE' }) // A user can have multiple devices
  geofence: Geofence;
}
