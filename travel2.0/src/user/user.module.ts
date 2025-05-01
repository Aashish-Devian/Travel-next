import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  imports: [
    TypeOrmModule.forFeature([User]), // Register UserRepository
    JwtModule.register({
      secret: 'your-secret-key', // Replace with environment variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
