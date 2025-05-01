import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { Role } from 'src/auth/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }

    return null;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async register(userData: RegisterUserDto) {
    console.log('🚀 ~ UserService ~ register ~ userData:', userData);
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await this.hashPassword(userData.password);
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role: Role.USER,
    });
    const savedUser = await this.userRepository.save(newUser);

    const payload = { userId: savedUser.user_id, email: savedUser.email };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: savedUser.user_id,
        email: savedUser.email,
        name: savedUser.name,
      },
    };
  }

  async login(user: User) {
    const payload = {
      userId: user.user_id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      relations: ['bookings'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // for promoted users
  async promoteToAdmin(userId: number) {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role === 'admin') {
      throw new Error('User is already an admin');
    }
    user.role = Role.ADMIN;
    return this.userRepository.save(user);
  }
}
