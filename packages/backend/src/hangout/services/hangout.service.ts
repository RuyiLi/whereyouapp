import { HangoutRepository } from '../../database/repositories/hangout.repository';
import { Injectable } from '@nestjs/common';
import { CreateHangoutDto } from '../../dtos/create-hangout.dto';
import { Hangout } from '../../database/entities/hangout.entity';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class HangoutService {
  constructor(
    private hangoutRepository: HangoutRepository,
    private userService: UserService,
  ) {}

  getHangout(id: string): Promise<Hangout | undefined> {
    return this.hangoutRepository.findOne(id);
  }

  async createHangout(input: CreateHangoutDto): Promise<Hangout> {
    const hangout = await this.hangoutRepository.create(input);
    const owner = await this.userService.getUser(input.ownerId);
    if (!owner) {
      throw new Error('User not found');
    }
    hangout.people = [owner];
    await this.hangoutRepository.save(hangout);
    hangout.people = hangout.people.map(this.userService.omitPassword);
    return hangout;
  }

  async addToHangout(
    hangoutId: string,
    emailOrUsername: string,
  ): Promise<Hangout> {
    const user = await this.userService.findByEmailOrUsername(emailOrUsername);
    if (!user) {
      throw new Error('User not found');
    }
    const hangout = await this.hangoutRepository.findOne({
      where: {
        id: hangoutId,
      },
      relations: ['people'],
    });
    if (!hangout) {
      throw new Error('Hangout not found');
    }

    if (hangout.people.some((person) => person.id === user.id)) {
      throw new Error('User already in hangout');
    }
    hangout.people.push(user);
    await this.hangoutRepository.save(hangout);

    hangout.people = hangout.people.map(this.userService.omitPassword);
    return hangout;
  }
}
