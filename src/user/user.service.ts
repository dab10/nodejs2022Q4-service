import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Errors } from 'src/utils/const';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new User(
      uuidv4(),
      createUserDto.login,
      createUserDto.password,
      1,
      new Date(),
      new Date(),
    );
    return await this.userRepo.save(newUser);
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(Errors.UserNotFound);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(Errors.UserNotFound);
    }

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException(Errors.oldPasswordIsWrong);
    }
    user.password = updateUserDto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = new Date();
    return await this.userRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(Errors.UserNotFound);
    }
    await this.userRepo.delete(id);
    return true;
  }
}
