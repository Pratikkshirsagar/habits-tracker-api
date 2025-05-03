import { CreateHabitDto } from '@src/habits/dto/create-habit.dto';
import { CreateEntityInput } from '@src/in-memory-db/models/create-entity-input.type';
import { HabitEntity } from '../entities/habit.enity';

export const mapCreateHabitDtoToCreateEntityInput = (
  createHabitDto: CreateHabitDto,
): CreateEntityInput<HabitEntity> => {
  const now = new Date();
  return {
    ...createHabitDto,
    habitId: now.getTime(),
    createdAt: now,
    updatedAt: now,
  };
};
