import { Controller, Get, Post, Render, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeviceService } from 'src/device/device.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
    private readonly deviceService: DeviceService
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

  @Get('/')
  @Render('index')
  showIndex() {
    return;
  }

  @Get('project-clients')
  @Render('project-clients')
  showProjectClients() {
    return;
  }

  @Get('features-list')
  @Render('features-list')
  showFeaturesList() {
    return;
  }


  @Get('device-list')
  @Render('device-list')
  async showDeviceList() {

    const devices = await this.deviceService.findAllDevice()
    console.log(devices)
    return {devices:devices};
  }



  
}
