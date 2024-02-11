import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';

export const updatePutUserDto: UpdatePutUserDTO = {
  name: 'Luis',
  email: 'lcaseiro@test.com',
  password: '$2b$10$CKbtFQrUlSzWCgiOskJoBewRAxvwLz2ZL/CN.hDguLt495DqvqCJ2',
  birthAt: new Date('2000-01-01'),
  role: Role.Admin,
};
