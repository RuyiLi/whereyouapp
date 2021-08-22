import { Injectable } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { UserRepository } from '../../database/repositories/user.repository';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { HashService } from '../../auth/services/hash.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
  ) {}

  omitPassword(user: User): User {
    // sus
    const { password, ...userInfo } = user;
    return {
      ...userInfo,
      password: '',
    };
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findByEmailOrUsername(
    emailOrUsername: string,
  ): Promise<User | undefined> {
    return (
      (await this.findByEmail(emailOrUsername)) ||
      (await this.findByUsername(emailOrUsername))
    );
  }

  async getUser(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      id,
    });
  }

  async createUser(input: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create({
      ...input,
      password: await this.hashService.hash(input.password),
    });
    await this.userRepository.save(user);
    return this.omitPassword(user);
  }
}
