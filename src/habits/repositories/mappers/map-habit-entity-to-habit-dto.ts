import { HabitDto } from '@src/habits/dto/habit.dto';
import { HabitEntity } from '../entities/habit.enity';

export const mapHabitEntityToHabitDto = (
  entity?: HabitEntity,
): HabitDto | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    id: String(entity.habitId),
    name: entity.name,
    description: entity.description,
  };
};
