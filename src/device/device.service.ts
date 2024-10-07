import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  // Create a new device and assign it to a user
  async create(createDeviceDto: CreateDeviceDto, user: User): Promise<Device> {
    const { device_name, device_serial_number } = createDeviceDto;

    const newDevice = this.deviceRepository.create({
      device_name,
      device_serial_number,
      user, // Associate the device with the user
    });

    return this.deviceRepository.save(newDevice);
  }

  // Find all devices associated with a user
  async findByUser(user: User): Promise<Device[]> {
    return this.deviceRepository.find({
      where: { user },
    });
  }

  // Find a specific device by ID
  async findOneById(id: number): Promise<Device> {
    const device = await this.deviceRepository.findOne({
        where: { id },
      });
    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }
    return device;
  }

  // Update a device
  async update(id: number, createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device = await this.findOneById(id);

    device.device_name = createDeviceDto.device_name;
    device.device_serial_number = createDeviceDto.device_serial_number;

    return this.deviceRepository.save(device);
  }

  // Delete a device
  async delete(id: number): Promise<void> {
    const result = await this.deviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }
  }
}
