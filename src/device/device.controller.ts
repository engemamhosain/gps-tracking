import { Controller, Post, Body, Get, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';


@Controller('device')
@UseGuards(JwtAuthGuard) // Require JWT authentication
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}
    @Post()
    create(@Body() createDeviceDto: CreateDeviceDto, @GetUser() user: User) {
      return this.deviceService.create(createDeviceDto, user);
    }
  
    @Get()
    findAll(@GetUser() user: User) {
      return this.deviceService.findByUser(user);
    }
  
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.deviceService.findOneById(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: number, @Body() createDeviceDto: CreateDeviceDto) {
      return this.deviceService.update(id, createDeviceDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: number) {
      return this.deviceService.delete(id);
    }
}
