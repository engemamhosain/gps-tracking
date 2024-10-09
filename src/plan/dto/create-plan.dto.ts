export class CreatePlanDto {
    readonly name: string;
    readonly price: number;
    readonly billing_cycle: 'monthly' | 'yearly';  // Billing cycle selection
  }
  