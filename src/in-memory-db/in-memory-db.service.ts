import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDbService {
  private store: Map<string, any[]> = new Map();

  create(entityName: string, input): any {
    this.getEntitiesStoreByName(entityName)?.push(input);
    return input;
  }

  find(entityName: string): any {
    return this.getEntitiesStoreByName(entityName);
  }

  private getEntitiesStoreByName(entityName: string) {
    if (!this.store.has(entityName)) {
      this.store.set(entityName, []);
    }

    return this.store.get(entityName);
  }
}
