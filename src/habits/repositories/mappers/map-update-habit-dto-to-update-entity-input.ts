import { UpdateHabitDto } from '@src/habits/dto/update-habit.dto';
import { HabitEntity } from '../entities/habit.enity';
import { UpdateEntityInput } from '@src/in-memory-db/models/update-entity-input.type';

export const mapUpdateHabitDtoToUpdateEntityInput = (
  updateHabitDto: UpdateHabitDto,
): UpdateEntityInput<HabitEntity> => {
  return {
    ...updateHabitDto,
    updatedAt: new Date(),
  };
};
