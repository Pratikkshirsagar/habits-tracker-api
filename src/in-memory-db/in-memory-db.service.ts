/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StoreItemEntity } from './models/store-item.enity';
import { CreateEntityInput } from './models/create-entity-input.type';
import { UpdateEntityInput } from './models/update-entity-input.type';
import { FindAllQuery } from './models/find-all-query.type';
import { FindOneQuery } from './models/find-one-query.type';

@Injectable()
export class InMemoryDbService {
  private store: Map<string, StoreItemEntity[]> = new Map();

  create<EntityModel extends StoreItemEntity>(
    entityName: string,
    input: CreateEntityInput<EntityModel>,
  ): EntityModel {
    const entityModel = {
      id: randomUUID(),
      ...input,
    } as EntityModel;

    this.getEntitiesStoreByName<EntityModel>(entityName).push(entityModel);

    console.log(this.store);
    return entityModel;
  }

  findAll<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: FindAllQuery<EntityModel>,
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
    query: FindOneQuery<EntityModel>,
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName<EntityModel>(entityName);
    return entities.find((entity) => {
      return Object.keys(query).every((key) => {
        const queryValue = query[key];
        const entityValue = entity[key];

        // Handle numeric string comparisons
        if (typeof entityValue === 'number' && typeof queryValue === 'string') {
          return entityValue === Number(queryValue);
        }

        // Handle numeric to string comparisons
        if (typeof entityValue === 'string' && typeof queryValue === 'number') {
          return entityValue === String(queryValue);
        }

        // Default strict equality
        return entityValue === queryValue;
      });
    });
  }

  deleteOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: FindOneQuery<EntityModel>,
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName<EntityModel>(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(query).every((key) => entity[key] === query[key]);
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
    query: FindOneQuery<EntityModel>,
    input: UpdateEntityInput<EntityModel>,
  ): EntityModel | undefined {
    const entities = this.getEntitiesStoreByName<EntityModel>(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(query).every((key) => entity[key] === query[key]);
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
