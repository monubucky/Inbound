import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }): Promise<{ token: string }> {
    // Implement your authentication logic here
    // For simplicity, let's assume you have validated the user and retrieved user details
    const userId = 1; // Replace with the actual user ID
    const username = body.username;
    const token = await this.authService.generateToken(userId, username);
    return { token };
  }
}
