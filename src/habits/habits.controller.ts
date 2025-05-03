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
import { HabitDto } from './dto/habit.dto';

@Controller('habits')
export class HabitsController {
  // Alternatively, you can use the @Inject() decorator to inject the service
  // @Inject(HabitsService)
  // private readonly habitsService: HabitsService;

  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  findAll(
    @Query('limit') limit: string,
    @Query('sortBy') sortBy: string,
  ): HabitDto[] | Promise<HabitDto[]> {
    const limitNumber = limit ? +limit : undefined;
    return this.habitsService.findAll({
      limit: limitNumber,
      sortBy,
    });
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): HabitDto | undefined | Promise<HabitDto | undefined> {
    const habit = this.habitsService.findOne(+id);

    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }

    return habit;
  }

  @Post()
  create(@Body() createHabitInput): HabitDto | Promise<HabitDto> {
    return this.habitsService.create(createHabitInput);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createHabitInput,
  ): HabitDto | undefined | Promise<HabitDto | undefined> {
    const habit = this.habitsService.update(+id, createHabitInput);

    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }

    return habit;
  }

  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @Delete(':id')
  delete(@Param('id') id: string): void | Promise<void> {
    const habit = this.habitsService.delete(+id);

    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }
  }
}
