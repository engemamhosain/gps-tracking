import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { Plan } from './entities/plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Plan])],
  providers: [PlanService],
  controllers: [PlanController],
  exports:[TypeOrmModule,PlanService]
})
export class PlanModule {}
