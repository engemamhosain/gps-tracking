import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert,CreateDateColumn,OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Device } from 'src/device/entities/device.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
  @OneToMany(() => Device, device => device.user) // One user can have multiple devices
  devices: Device[];

   // You can use ENUM to define the user type or role
   @Column({
    type: 'enum', // Specifies that the column uses an ENUM type
    enum: ['user', 'admin'], // Enum values: 'user' or 'admin'
    default: 'user', // Default role is 'user'
  })
  user_type: 'user' | 'admin';

  @CreateDateColumn()  // Automatically adds a timestamp when a user is created
  created_at: Date;

  @BeforeInsert()
  async hashPassword() {
    // const salt = await bcrypt.genSalt();
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }

  async validatePassword(password: string): Promise<boolean> {

    return await bcrypt.compare(password, this.password);
  }
}
