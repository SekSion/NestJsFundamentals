import { Role } from '../enums/role.enum';
import { UpdatePatchUserDTO } from '../user/dto/update-patch-user.dto';

export const updatePatchUserDto: UpdatePatchUserDTO = {
  name: 'Luis',
  email: 'lcaseiro@test.com',
  password: '$2b$10$CKbtFQrUlSzWCgiOskJoBewRAxvwLz2ZL/CN.hDguLt495DqvqCJ2',
  birthAt: new Date('2000-01-01'),
  role: Role.Admin,
};
