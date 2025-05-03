import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '@src/in-memory-db/in-memory-db.service';
import { HabitDto } from '../dto/habit.dto';
import { HabitEntity } from './entities/habit.enity';
import { mapHabitEntityToHabitDto } from './mappers/map-habit-entity-to-habit-dto';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { UpdateHabitDto } from '../dto/update-habit.dto';
import { mapCreateHabitDtoToCreateEntityInput } from './mappers/map-create-dto-to-create-entity-input';
import { mapUpdateHabitDtoToUpdateEntityInput } from './mappers/map-update-habit-dto-to-update-entity-input';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  findAllHabits(query: { limit?: number; sortBy?: 'name' | 'id' }): HabitDto[] {
    return this.db
      .findAll<HabitEntity>('habits', query)
      .map((habitEntity) => mapHabitEntityToHabitDto(habitEntity)!);
  }

  findHabitById(id: number): HabitDto | undefined {
    const habitEntity = this.db.findOneBy<HabitEntity>('habits', {
      habitId: id,
    });

    return mapHabitEntityToHabitDto(habitEntity);
  }

  createHabit(createHabitInput: CreateHabitDto): HabitDto {
    const habitEntity = this.db.create<HabitEntity>(
      'habits',
      mapCreateHabitDtoToCreateEntityInput(createHabitInput),
    );
    return mapHabitEntityToHabitDto(habitEntity)!;
  }

  updateHabit(id: number, updatedInput: UpdateHabitDto): HabitDto | undefined {
    const habitEntity = this.db.updateOneBy<HabitEntity>(
      'habits',
      { habitId: id },
      mapUpdateHabitDtoToUpdateEntityInput(updatedInput),
    );

    return mapHabitEntityToHabitDto(habitEntity);
  }

  removeHabit(id: number): HabitDto | undefined {
    const habitEntity = this.db.deleteOneBy<HabitEntity>('habits', {
      habitId: id,
    });
    return mapHabitEntityToHabitDto(habitEntity);
  }
}
