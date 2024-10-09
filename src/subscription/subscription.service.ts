import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Plan } from '../plan/entities/plan.entity';
import { Subscription } from './entities/subscription.entity';
import { User } from 'src/user/entities/user.entity';
import { Device } from 'src/device/entities/device.entity';
import { DeviceService } from 'src/device/device.service';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    private readonly deviceService: DeviceService

  ) {}

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto,user:User) {
    const { device_serial_number, plan_id, billing_cycle } = createSubscriptionDto;

    // Find the plan by its ID (plan_id is a number)
    


    const device = await this.deviceService.findOneBySerialNumber(createSubscriptionDto.device_serial_number,user)
  
    const plan = await this.planRepository.findOne({
      where: { id: plan_id },
    });

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    const startDate = new Date(); // Current date
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.durationMonths); // Calculate end date based on plan duration


    // Create a new subscription entity
    const subscription = this.subscriptionRepository.create({
      device_serial_number,
      plan,
      device,
      user,
      billing_cycle,
      startDate,
      endDate,
    });

    // Save the subscription
    return await this.subscriptionRepository.save(subscription);
  }

  async getUserSubscriptions(user: User) {
    return this.subscriptionRepository.find({ where: { user } });
  }
}
