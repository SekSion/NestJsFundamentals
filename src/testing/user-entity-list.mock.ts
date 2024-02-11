import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    name: 'Luis',
    email: 'lcaseiro@test.com',
    password: '$2b$10$CKbtFQrUlSzWCgiOskJoBewRAxvwLz2ZL/CN.hDguLt495DqvqCJ2',
    birthAt: new Date('2000-01-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.Admin,
  },
  {
    id: 2,
    name: 'Random 1',
    email: 'random1@test.com',
    password: '$2b$10$srG22eMbGsftTSVVraoG7.rzocNU69.2akmBz5Wc8vw9kmbeomN0q',
    birthAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.User,
  },
  {
    id: 3,
    name: 'Random 2',
    email: 'random2@test.com',
    password: '$2b$10$ZkDkFCo89R7Fv0HOMMxA3.XK5Dx5x3aW2198/xpoDcjOEWvwk9V62',
    birthAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.User,
  },
  {
    id: 4,
    name: 'Random 3',
    email: 'random3@test.com',
    password: '$2b$10$nvxdZs4HYwChTwBYK/VAa.BpY779A9f5Oo1EJM3gxe1CwWu93x9Ji',
    birthAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.User,
  },
];
