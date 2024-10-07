import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from '../user/dto/login.dto';
import { ApiTags, ApiResponse, ApiOperation,ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiBody({
        description: 'The data required to create a new user',
        type: CreateUserDto,  // Defines the structure of the body
      })
    async register(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto.username, createUserDto.password);
    }
  
    @Post('login')
    async login(@Body()loginDto:LoginDto) {
      const user = await this.authService.validateUser(loginDto.username, loginDto.password);
      if (!user) {
        return { message: 'Invalid credentials' };
      }
      return this.authService.login(user);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Post('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
