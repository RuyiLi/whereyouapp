import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hangout } from './hangout.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // lat;lng
  @Column()
  location: string;

  @Column()
  avatarUrl: string;

  @ManyToMany(() => Hangout, (hangout) => hangout.people)
  hangouts: Hangout[];
}
