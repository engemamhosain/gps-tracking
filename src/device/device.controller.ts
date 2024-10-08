import { Controller, Post, Body, Get, Param, Delete, Patch, UseGuards, Put } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('devices')
@Controller('device')
@UseGuards(JwtAuthGuard) // Require JWT authentication
@ApiBearerAuth('access-token')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}


   
    @Post()
    create(@Body() createDeviceDto: CreateDeviceDto, @GetUser() user: User) {
      return this.deviceService.create(createDeviceDto, user);
    }
  
    @Get()
    async findAll(@GetUser() user: User) {
      return this.deviceService.findAll(user);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number, @GetUser() user: User) {
      return this.deviceService.findOne(id, user);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() updateDeviceDto: CreateDeviceDto,
      @GetUser() user: User,
    ) {
      return this.deviceService.update(id, updateDeviceDto, user);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number, @GetUser() user: User) {
      return this.deviceService.remove(id, user);
    }
}
