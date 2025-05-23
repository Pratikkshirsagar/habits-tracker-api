import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';
import { InMemoryDbModule } from '@src/in-memory-db/in-memory-db.module';

@Module({
  imports: [InMemoryDbModule],
  controllers: [HabitsController],
  providers: [HabitsService, InMemoryHabitsRepository],
})
export class HabitsModule {}
