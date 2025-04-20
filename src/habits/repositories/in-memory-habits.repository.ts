import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '@src/in-memory-db/in-memory-db.service';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  findAllHabits(): any[] {
    return this.db.find('habits');
  }

  createHabit(createHabitInput: any): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newHabit = {
      id: new Date().getTime(),
      ...createHabitInput,
    };

    return this.db.create('habits', newHabit);
  }
}
