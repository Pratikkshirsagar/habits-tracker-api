/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StoreItemEntity } from './models/store-item.enity';

@Injectable()
export class InMemoryDbService {
  private store: Map<string, StoreItemEntity[]> = new Map();

  create<EntityModel extends StoreItemEntity>(
    entityName: string,
    entity,
  ): EntityModel {
    const newEntity = {
      id: randomUUID().toString(),
      ...entity,
    } as EntityModel;

    this.getEntitiesStoreByName<EntityModel>(entityName).push(newEntity);
    return newEntity;
  }

  findAll<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: { limit?: number; sortBy?: string } = {},
  ): EntityModel[] {
    const { limit, sortBy } = query;
    const reuslt = this.getEntitiesStoreByName<EntityModel>(entityName);

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

  findOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    filter: { [key: string]: any },
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName<EntityModel>(entityName);
    return entities.find((entity) => {
      return Object.keys(filter).every((key) => entity[key] === filter[key]);
    });
  }

  deleteOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    filter: { [key: string]: any },
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName<EntityModel>(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(filter).every((key) => entity[key] === filter[key]);
    });

    if (entityIndex === -1) {
      return undefined;
    }

    const deletedEntity = entities[entityIndex];
    entities.splice(entityIndex, 1);
    return deletedEntity;
  }

  updateOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    filter: { [key: string]: any },
    input: Partial<Omit<EntityModel, 'id'>>,
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName<EntityModel>(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(filter).every((key) => entity[key] === filter[key]);
    });

    if (entityIndex === -1) {
      return undefined;
    }

    const updatedEntity: EntityModel = { ...entities[entityIndex], ...input };
    entities[entityIndex] = updatedEntity;
    return updatedEntity;
  }

  private getEntitiesStoreByName<EntityModel extends StoreItemEntity>(
    entityName: string,
  ): EntityModel[] {
    // If the entity store does not exist, create it
    if (!this.store.has(entityName)) {
      this.store.set(entityName, []);
    }

    return this.store.get(entityName) as EntityModel[];
  }
}
