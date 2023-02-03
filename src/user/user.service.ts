import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Errors } from 'src/utils/const';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new User(
      uuidv4(),
      createUserDto.login,
      createUserDto.password,
      1,
      Date.now(),
      Date.now(),
    );
    this.db.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(Errors.UserNotFound);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = this.db.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(Errors.UserNotFound);
    }
    const user = this.db.users[index];
    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException(Errors.oldPasswordIsWrong);
    }
    user.password = updateUserDto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string) {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(Errors.UserNotFound);
    }
    this.db.users = this.db.users.filter((item) => item.id !== id);
  }
}
