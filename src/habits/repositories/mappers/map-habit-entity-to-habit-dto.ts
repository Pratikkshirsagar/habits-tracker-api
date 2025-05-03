import { HabitDto } from '@src/habits/dto/habit.dto';
import { HabitEntity } from '../entities/habit.enity';

export const mapHabitEntityToHabitDto = (
  entity?: HabitEntity,
): HabitDto | undefined => {
  if (!entity) {
    return undefined;
  }

  const { id, name, description } = entity;

  return {
    id,
    name,
    description,
  };
};
