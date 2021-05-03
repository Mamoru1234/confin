import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export default class TagEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  value!: string;

  @Column()
  namespace: string;
}
