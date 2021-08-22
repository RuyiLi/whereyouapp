import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HangoutRepository } from '../database/repositories/hangout.repository';
import { HangoutService } from './services/hangout.service';
import { HangoutController } from './controllers/hangout.controller';
import { UserService } from '../user/services/user.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../database/repositories/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([HangoutRepository, UserRepository]),
  ],
  controllers: [HangoutController],
  providers: [HangoutService, UserService],
  exports: [HangoutService],
})
export class HangoutModule {}
