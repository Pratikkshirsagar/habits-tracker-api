import { Injectable } from '@nestjs/common';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';

@Injectable()
export class HabitsService {
  constructor(private readonly repository: InMemoryHabitsRepository) {}

  findAll(query: { limit?: number; sortBy?: string }): any {
    const limit = query.limit ?? 10;
    const sortBy = query.sortBy ?? 'name';
    return this.repository.findAllHabits({ limit, sortBy });
  }

  findOne(id: number): any {
    return this.repository.findHabitById(id);
  }

  create(createHabitInput): any {
    return this.repository.createHabit(createHabitInput);
  }

  update(id: number, updateInput): any {
    return this.repository.updateHabit(id, updateInput);
  }

  delete(id: number): any {
    return this.repository.removeHabit(id);
  }
}
