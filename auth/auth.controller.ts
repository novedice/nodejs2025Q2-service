import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async userSingup(@Body() signupDto: SignupDto) {
    console.log(signupDto);
    return await this.authService.signup(signupDto);
  }

  @Post('login')
  async userLogin(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return await this.authService.login(loginDto);
  }

  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return await this.authService.refresh(refreshToken);
    // console.log(refreshToken);
  }
}
