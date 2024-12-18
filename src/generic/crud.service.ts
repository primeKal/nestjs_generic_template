import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { BaseEntity } from './entity/base.entity';

@Injectable()
export class GenericService<T extends BaseEntity<T>> {
    constructor(
        protected repository: Repository<T>,
    ) { }


    findAll(): Promise<T[]> {
        return this.repository.find({ where: { is_deleted: false }, order: { created_at: 'DESC' } } as any);
    }

    findOne(id: number): Promise<T> {
        return this.repository.findOne({ where: { id: id } } as any);
    }

    async create(t: any, created_by_id: number = 0): Promise<any> {
        const partial: DeepPartial<T> = {
            ...t,
            created_by_id: created_by_id
        };
        const entity = this.repository.create(partial);

        const returnEntity = await this.repository.save(entity);
        return returnEntity;
    }

    async createMany(ts: T[]): Promise<any[]> {
        const partials: DeepPartial<T>[] = ts.map(t => ({ ...t }));
        const entities = this.repository.create(partials);
        const savedEntities = await this.repository.save(entities);

        return savedEntities.map(entity => classToPlain(entity));
    }
    async update(id: number, t: any): Promise<T> {
        console.log("update started for ", id, t);
        await this.repository.update(id, t);
        console.log("in findOne");
        if (id === undefined || id === null) {
            throw new Error("Invalid ID provided");
        }
        const entity = await this.repository.findOne({ where: { id: id } } as any);
        if (!entity) {
            throw new Error(`Entity with ID ${id} not found`);
        }
        return entity;
    }

    async remove(id: number): Promise<void> {
        await this.repository.update(id, { is_deleted: true, deleted_at: new Date() } as any);
    }
    async removeByCreator(createdById: number): Promise<void> {
        await this.repository.update({ created_by_id: createdById } as any, { is_deleted: true, deleted_at: new Date() } as any);
    }
    async hardRemove(id: number): Promise<void> {
        await this.repository.delete(id);
    }

}
