import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // e.g., Basic, Premium, etc.

  @Column('decimal')
  price: number;

  @Column()
  durationMonths: number; // Duration of the plan in months

  @Column({
    type: 'enum',
    enum: ['monthly', 'yearly'],  // Billing cycle options
    default: 'monthly',
  })
  billing_cycle: 'monthly' | 'yearly';  // Default is monthly

  @OneToMany(() => Subscription, subscription => subscription.plan) // One user can have multiple devices
  subscriptions: Subscription[];
}
