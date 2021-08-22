import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Hangout {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  ownerId: string;

  @ManyToMany(() => User, (user) => user.hangouts, {
    cascade: true,
  })
  @JoinTable()
  people: User[];
}
