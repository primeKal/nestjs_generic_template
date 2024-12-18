import { BaseEntity } from "src/generic/entity/base.entity";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Lookup<T> extends BaseEntity<Lookup<T>> {

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    code: string;
}
