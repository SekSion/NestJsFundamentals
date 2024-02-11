import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { accessToken } from '../testing/token.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { resetToken } from '../testing/reset-token.mock';
import { authRegisterDto } from '../testing/auth-register-dto.mock';

let authService: AuthService;

describe('AuthService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, userRepositoryMock, jwtServiceMock, userServiceMock, mailerServiceMock],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validate a definition of auth service', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('create Token', async () => {
      const result = await authService.createToken(userEntityList[0]);

      expect(result).toEqual({
        accessToken,
      });
    });
  });
  test('checkToken', async () => {
    const result = await authService.checkToken(accessToken);

    expect(result).toEqual(jwtPayload);
  });

  test('isValidToken', () => {
    const result = authService.isValidToken(accessToken);

    expect(result).toEqual(true);
  });

  describe('Auth', () => {
    test('login', async () => {
      const result = await authService.login('lcaseiro@test.com', '123456');

      expect(result).toEqual({ accessToken });
    });

    test('forget', async () => {
      const result = await authService.forget('lcaseiro@test.com');

      expect(result).toEqual({ success: true });
    });

    test('reset', async () => {
      const result = await authService.reset('654321', resetToken);

      expect(result).toEqual({ accessToken });
    });

    test('register method', async () => {
      const result = await authService.register(authRegisterDto);

      expect(result).toEqual({ accessToken });
    });
  });
});
