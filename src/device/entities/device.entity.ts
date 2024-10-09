import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Location } from '../../location/entities/location.entity';
import { Geofence } from 'src/geofence/entities/geofence.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  device_serial_number: string;

  @Column()
  vehicle_name: string;
  @Column()
  vehicle_number: string;


  @Column({
    type: 'enum', // Specifies that the column uses an ENUM type
    enum: ['bike', 'car'], // Enum values: 'user' or 'admin'
    default: 'car', // Default role is 'user'
  })
  vehicle_type: 'bike' | 'car';

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

  @OneToMany(() => Subscription, subscription => subscription.device) // One user can have multiple devices
  subscriptions: Subscription[];
}
