import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/entities/user.entity';  // Assuming you have a User entity
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('subscription')
@UseGuards(JwtAuthGuard) // Require JWT authentication
@ApiBearerAuth('access-token')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}


  @Post()
  @ApiResponse({ status: 201, description: 'Subscription successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @GetUser() user: User,  // Extract the authenticated user
  ) {
    return this.subscriptionService.createSubscription(createSubscriptionDto, user);
  }


  @Get()
  async getUserSubscriptions(@GetUser() user: User) {
    return this.subscriptionService.getUserSubscriptions(user);
  }
}
