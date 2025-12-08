import { BadRequestException, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(':type')
  authentication(@Param('type') type: string) {
    if (type === 'signup') this.authService.signup();
    if (type === 'login') this.authService.login();
    if (type === 'refresh') this.authService.refresh();
    throw new BadRequestException('invalid path');
  }
}
