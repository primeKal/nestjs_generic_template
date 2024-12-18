import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

@Entity()
export class BaseEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  created_by_id?: number;

  @Column({ nullable: true })
  updated_by_id?: number;

  @Column({ default: false }) 
  is_deleted: boolean; 

  @Column({ nullable: true })
  deleted_at: Date;


  constructor(item: Partial<T>) {
    Object.assign(this, item);
  }

}