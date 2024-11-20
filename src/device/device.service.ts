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

  async findAll(user: User): Promise<Device[]> {
    return this.deviceRepository.find({ where: { user:{id:user.id} } });
  }

  async findAllDevice(): Promise<Device[]> {
    return this.deviceRepository.find({});
  }

  async findOne(id: number, user: User): Promise<Device> {
    return this.deviceRepository.findOne({ where: { id, user:{id:user.id} } });
  }

  async findOneBySerialNumber(device_serial_number: string, user: User): Promise<Device> {
    return this.deviceRepository.findOne({ where: { device_serial_number, user:{id:user.id} } });
  }


  async update(id: number, updateDeviceDto: CreateDeviceDto, user: User): Promise<Device> {
    await this.deviceRepository.update({ id, user }, updateDeviceDto);
    return this.deviceRepository.findOne({ where: { id, user:{id:user.id}  } });
  }

  async remove(id: number, user: User): Promise<void> {
    await this.deviceRepository.delete({ id, user:{id:user.id}  });
  }


  async getDeviceDetails(serialNumber: string) {
    const device = await this.deviceRepository
      .createQueryBuilder('device')
      .leftJoinAndSelect('device.subscriptions', 'subscription')
      .leftJoinAndSelect('device.locations', 'location')
      .where('device.device_serial_number = :serialNumber', { serialNumber })
      .getOne();

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    return device;
  }




  async getDevicesDetailsList(user: User): Promise<Device[]>{
    const id=user.id
    const device = await this.deviceRepository
      .createQueryBuilder('device')
      .leftJoinAndSelect('device.subscriptions', 'subscription')
      .leftJoinAndSelect('device.locations', 'location')
      .where('device.userId = :id', { id})
      .getMany();
   

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    console.log(device)
    return device;
  }


}
