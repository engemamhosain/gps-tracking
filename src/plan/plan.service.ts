import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async createPlan(createPlanDto: CreatePlanDto): Promise<Plan> {
    const plan = this.planRepository.create(createPlanDto);
    return this.planRepository.save(plan);
  }

  async findPlanById(id: number): Promise<Plan> {
    const plan = await this.planRepository.findOne({
        where: { id: id },
      });
    return plan;
  }

  async getAllPlans(): Promise<Plan[]> {
    return this.planRepository.find();
  }
}
