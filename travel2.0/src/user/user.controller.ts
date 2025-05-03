import {
  Body,
  Controller,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() userData: RegisterUserDto) {
    return this.userService.register(userData);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.userService.login(user);
  }

  @Post(':userId/promote')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN) // Only admin and super admin can promote users
  @UseGuards(RolesGuard) // Protect this route with the RolesGuard
  async promoteToAdmin(@Param('userId') userId: number) {
    console.log('🚀 ~ UserController ~ promoteToAdmin ~ userId:', userId);
    return this.userService.promoteToAdmin(userId);
  }
}
