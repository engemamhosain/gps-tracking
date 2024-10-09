import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsDateString, IsString } from 'class-validator';

export class 
CreateSubscriptionDto {
  @ApiProperty({ example: 'SN1234567890' })
  @IsNotEmpty()
  @IsString()
  device_serial_number: string;  // Device serial number for subscription


  @ApiProperty({ example: '2' })
  @IsNotEmpty()
  @IsString()
  plan_id: number;  // ID of the subscription plan

  @ApiProperty({ example: 'yearly' })
  @IsEnum(['monthly', 'yearly'], { message: 'Billing cycle must be either monthly or yearly' })
  billing_cycle: 'monthly' | 'yearly';  // Optional, defaults to plan's billing cycle



  // You can add more fields if needed, like trial period, discounts, etc.
}
