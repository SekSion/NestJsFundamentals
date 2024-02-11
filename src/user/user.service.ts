import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    try {
      if (
        await this.userRepository.exist({
          where: {
            email: data.email,
          },
        })
      ) {
        throw new BadRequestException('Email being used');
      }

      const salt = await bcrypt.genSalt();

      data.password = await bcrypt.hash(data.password, salt);

      const user = this.userRepository.create(data);
      return this.userRepository.save(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async list() {
    return this.userRepository.find();
  }

  async show(id: number) {
    await this.exists(id);

    return this.userRepository.findOneBy({
      id,
    });
  }

  async update(id: number, { name, email, password, birthAt, role }: UpdatePutUserDTO) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    await this.userRepository.update(id, {
      email,
      name,
      password,
      birthAt: birthAt ? new Date(birthAt) : null,
      role,
    });

    return this.show(id);
  }

  async updatePartial(id: number, { name, email, password, birthAt, role }: UpdatePatchUserDTO) {
    await this.exists(id);

    const data: any = {};

    if (data.birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }

    if (role) {
      data.role = role;
    }

    await this.userRepository.update(id, data);
    return this.show(id);
  }

  async delete(id: number) {
    await this.exists(id);

    await this.userRepository.delete(id);
    return true;
  }

  async exists(id: number) {
    if (
      !(await this.userRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('User Not Found for edit.');
    }
  }
}
