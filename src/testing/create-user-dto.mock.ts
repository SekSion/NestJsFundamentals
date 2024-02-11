import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDto: CreateUserDTO = {
  name: 'Luis',
  email: 'lcaseiro@test.com',
  password: '$2b$10$CKbtFQrUlSzWCgiOskJoBewRAxvwLz2ZL/CN.hDguLt495DqvqCJ2',
  birthAt: new Date('2000-01-01'),
  role: Role.Admin,
};
