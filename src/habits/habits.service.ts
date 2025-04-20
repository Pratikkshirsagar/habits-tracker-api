import { Injectable } from '@nestjs/common';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';

@Injectable()
export class HabitsService {
  constructor(
    private readonly inMemoryHabitsRepository: InMemoryHabitsRepository,
  ) {}

  findAll(): any[] {
    return this.inMemoryHabitsRepository.findAllHabits();
  }

  create(createHabitInput): any {
    return this.inMemoryHabitsRepository.createHabit(createHabitInput);
  }
}
