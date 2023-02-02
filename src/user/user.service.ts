import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new User (
      uuidv4(),
      createUserDto.login,
      createUserDto.password,
      1,
      Date.now(),
      Date.now()
    )
    this.db.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
