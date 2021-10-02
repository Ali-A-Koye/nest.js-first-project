import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignupDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: LoginDTO) {
    return this.authService.login(body.username, body.password);
  }

  @Post('/signup')
  signup(@Body() body: SignupDTO) {
    let data = this.authService.signup({
      username: body.username,
      password: body.password,
      name: body.name,
    });

    return data;
  }
}
