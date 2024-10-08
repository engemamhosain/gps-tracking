import { Controller, Get, Post, Render, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService
  ) {}

  @Get('login')
  @Render('admin-login')
  showLoginPage() {
    return;
  }

  @Post('login')
  async login(@Body() body: any, @Res() res) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);
    if (user) {
      const token = await this.authService.login(user);
      res.cookie('jwt', token, { httpOnly: true });
      return res.redirect('/dashboard');
    //   return res.status(HttpStatus.OK).json({ token });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).render('admin-login', {
        error: 'Invalid credentials',
      });
    }
  }

  // Route protected by JWT
  @Get('dashboard')
  @Render('admin-dashboard')
  showDashboard() {
    return;
  }
}
