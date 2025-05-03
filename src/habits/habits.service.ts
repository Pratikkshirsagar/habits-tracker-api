import { Injectable } from '@nestjs/common';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';
import { HabitDto } from './dto/habit.dto';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Injectable()
export class HabitsService {
  constructor(private readonly repository: InMemoryHabitsRepository) {}

  findAll(query: {
    limit?: number;
    sortBy?: 'name' | 'id';
  }): HabitDto[] | Promise<HabitDto[]> {
    const limit = query.limit ?? 10;
    const sortBy = query.sortBy ?? 'name';
    return this.repository.findAllHabits({ limit, sortBy });
  }

  findOne(id: number): HabitDto | undefined | Promise<HabitDto | undefined> {
    return this.repository.findHabitById(id);
  }

  create(createHabitInput: CreateHabitDto): HabitDto | Promise<HabitDto> {
    return this.repository.createHabit(createHabitInput);
  }

  update(
    id: number,
    updateInput: UpdateHabitDto,
  ): HabitDto | undefined | Promise<HabitDto | undefined> {
    return this.repository.updateHabit(id, updateInput);
  }

  delete(id: number): HabitDto | undefined | Promise<HabitDto | undefined> {
    return this.repository.removeHabit(id);
  }
}
