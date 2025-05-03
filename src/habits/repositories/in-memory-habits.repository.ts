import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '@src/in-memory-db/in-memory-db.service';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  findAllHabits(query: { limit?: number; sortBy?: string }): any {
    return this.db.findAll('habits', query);
  }

  findHabitById(id: number): any {
    return this.db.findOneBy('habits', { id });
  }

  createHabit(createHabitInput: any): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newHabit = {
      id: new Date().getTime(),
      ...createHabitInput,
    };

    return this.db.create('habits', newHabit);
  }

  updateHabit(id: number, updatedInput): any {
    return this.db.updateOneBy('habits', { id }, updatedInput);
  }

  removeHabit(id: number): any {
    return this.db.deleteOneBy('habits', { id });
  }
}
