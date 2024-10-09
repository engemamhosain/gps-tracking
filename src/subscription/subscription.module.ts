import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { PlanModule } from 'src/plan/plan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports:[TypeOrmModule.forFeature([Subscription]),PlanModule,DeviceModule],
  providers: [SubscriptionService],
  controllers: [SubscriptionController], 
})
export class SubscriptionModule {}
