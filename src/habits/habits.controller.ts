import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
  // Alternatively, you can use the @Inject() decorator to inject the service
  // @Inject(HabitsService)
  // private readonly habitsService: HabitsService;

  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  findAll(@Query('limit') limit: string, @Query('sortBy') sortBy: string): any {
    const limitNumber = limit ? +limit : undefined;
    return this.habitsService.findAll({ limit: limitNumber, sortBy });
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    const habit = this.habitsService.findOne(+id);

    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }

    return habit;
  }

  @Post()
  create(@Body() createHabitInput): any {
    return this.habitsService.create(createHabitInput);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createHabitInput): any {
    const habit = this.habitsService.update(+id, createHabitInput);

    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }

    return habit;
  }

  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @Delete(':id')
  delete(@Param('id') id: string): any {
    const habit = this.habitsService.delete(+id);

    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }

    return habit;
  }
}
