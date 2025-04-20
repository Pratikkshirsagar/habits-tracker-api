import { Controller, Get, Post, Body } from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
  // Alternatively, you can use the @Inject() decorator to inject the service
  // @Inject(HabitsService)
  // private readonly habitsService: HabitsService;

  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  findAll(): any[] {
    return this.habitsService.findAll();
  }

  @Post()
  create(@Body() createHabitInput): any {
    return this.habitsService.create(createHabitInput);
  }
}
