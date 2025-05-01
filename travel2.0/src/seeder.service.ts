// seeder.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user/entities/user.entity';
import { Role } from './auth/roles.enum';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.createSuperAdmin();
  }

  async createSuperAdmin() {
    const existingSuperAdmin = await this.userRepository.findOne({
      where: { role: Role.SUPER_ADMIN },
    });

    if (!existingSuperAdmin) {
      const passwordHash = await bcrypt.hash('superadminpassword', 10);
      const superAdmin = this.userRepository.create({
        name: 'Super Admin',
        email: 'admin@example.com',
        password: passwordHash,
        role: Role.SUPER_ADMIN,
      });

      await this.userRepository.save(superAdmin);
      console.log('SuperAdmin created!');
    } else {
      console.log('SuperAdmin already exists!');
    }
  }
}
