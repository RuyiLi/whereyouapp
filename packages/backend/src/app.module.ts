import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { configuration, validationSchema } from './configuration';
import { HangoutRepository } from './database/repositories/hangout.repository';
import { UserRepository } from './database/repositories/user.repository';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { HangoutModule } from './hangout/hangout.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    HangoutModule,
    PassportModule,
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ...config.get('typeorm'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
            ca: readFileSync('root.crt').toString(),
          },
        },
      }),
    }),
  ],
})
export class AppModule {}
