/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDbService {
  private store: Map<string, any[]> = new Map();

  create(entityName: string, input): any {
    this.getEntitiesStoreByName(entityName)?.push(input);
    return input;
  }

  findAll(
    entityName: string,
    query: { limit?: number; sortBy?: string } = {},
  ): any {
    const { limit, sortBy } = query;
    const reuslt = this.getEntitiesStoreByName(entityName);

    if (sortBy) {
      reuslt.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }

    if (limit) {
      return reuslt.slice(0, limit);
    }

    return reuslt;
  }

  findOneBy(entityName: string, filter: { [key: string]: any }) {
    const entities = this.getEntitiesStoreByName(entityName);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entities.find((entity) => {
      const isMatchingFilter = Object.keys(filter).every(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (key) => entity[key] === filter[key],
      );

      return isMatchingFilter;
    });
  }

  deleteOneBy(entityName: string, filter: { [key: string]: any }) {
    const entities = this.getEntitiesStoreByName(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(filter).every((key) => entity[key] === filter[key]);
    });

    if (entityIndex === -1) {
      return undefined;
    }

    const deletedEntity: any = entities[entityIndex];
    entities.splice(entityIndex, 1);
    return deletedEntity;
  }

  updateOneBy(entityName: string, filter: { [key: string]: any }, updateInput) {
    const entities = this.getEntitiesStoreByName(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(filter).every((key) => entity[key] === filter[key]);
    });

    if (entityIndex === -1) {
      return undefined;
    }

    const updatedEntity = { ...entities[entityIndex], ...updateInput };
    entities[entityIndex] = updatedEntity;
    return updatedEntity;
  }

  private getEntitiesStoreByName(entityName: string): any[] {
    if (!this.store.has(entityName)) {
      this.store.set(entityName, []);
    }

    return this.store.get(entityName)!;
  }
}
