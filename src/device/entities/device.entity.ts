import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

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
}
