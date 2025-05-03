import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '@src/in-memory-db/in-memory-db.service';
import { HabitDto } from '../dto/habit.dto';
import { HabitEntity } from './entities/habit.enity';
import { mapHabitEntityToHabitDto } from './mappers/map-habit-entity-to-habit-dto';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  findAllHabits(query: { limit?: number; sortBy?: string }): HabitDto[] {
    return this.db
      .findAll<HabitEntity>('habits', query)
      .map((habitEntity) => mapHabitEntityToHabitDto(habitEntity)!);
  }

  findHabitById(id: number): HabitDto | undefined {
    const habitEntity = this.db.findOneBy<HabitEntity>('habits', { id });
    return mapHabitEntityToHabitDto(habitEntity);
  }

  createHabit(createHabitInput: any): HabitDto {
    const now = new Date();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newHabit: HabitEntity = {
      ...createHabitInput,
      habitId: new Date().getTime(),
      crearedAt: now,
      updatedAt: now,
    };

    const habitEntity = this.db.create<HabitEntity>('habits', newHabit);
    return mapHabitEntityToHabitDto(habitEntity)!;
  }

  updateHabit(id: number, updatedInput): HabitDto | undefined {
    const habitEntity = this.db.updateOneBy<HabitEntity>(
      'habits',
      { id },
      { ...updatedInput, updateAt: new Date() },
    );

    return mapHabitEntityToHabitDto(habitEntity);
  }

  removeHabit(id: number): HabitDto | undefined {
    const habitEntity = this.db.deleteOneBy<HabitEntity>('habits', { id });
    return mapHabitEntityToHabitDto(habitEntity);
  }
}
