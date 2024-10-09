import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Device } from '../../device/entities/device.entity';
import { Plan } from '../../plan/entities/plan.entity';


export enum SubscriptionStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  device_serial_number: string;  // Ensure this column is present

  @CreateDateColumn()
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  // Relation to User
  @ManyToOne(() => User, user => user.subscriptions, { onDelete: 'CASCADE' })
  user: User;

  // Relation to Device
  @ManyToOne(() => Device, device => device.subscriptions, { onDelete: 'CASCADE' })
  device: Device;

  // Relation to Plan
  @ManyToOne(() => Plan, plan => plan.subscriptions, { eager: true })
  plan: Plan;  // Subscription to a specific plan

  // Billing cycle (monthly, yearly, etc.)
  @Column({
    type: 'enum',
    enum: ['monthly', 'yearly'],  // Options for billing cycle
    default: 'monthly',
  })
  billing_cycle: 'monthly' | 'yearly';

  

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.PENDING,
  })
  status: SubscriptionStatus; // The status of the subscription

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
