import { EntityRepository, Repository } from 'typeorm';
import { Hangout } from '../entities/hangout.entity';

@EntityRepository(Hangout)
export class HangoutRepository extends Repository<Hangout> {}
