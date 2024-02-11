import { Test, TestingModule } from '@nestjs/testing';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authServiceMock } from '../testing/auth-service.mock';
import { fileServiceMock } from '../testing/file-service.mock';
import { FileService } from '../file/file.service';
import { authLoginDto } from '../testing/auth-login-dto.mock';
import { accessToken } from '../testing/token.mock';
import { authRegisterDto } from '../testing/auth-register-dto.mock';
import { authResetDto } from '../testing/auth-reset-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { getPhoto } from '../testing/get-photo.mock';

let authController: AuthController;
let authService: AuthService;
let fileService: FileService;

describe('AuthController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    fileService = module.get<FileService>(FileService);
  });

  test('Validate', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
    expect(fileService).toBeDefined();
  });

  describe('Flux of authentication', () => {
    test('login method', async () => {
      const result = await authController.login(authLoginDto);

      expect(result).toEqual({ accessToken });
    });

    test('register method', async () => {
      const result = await authController.register(authRegisterDto);

      expect(result).toEqual({ accessToken });
    });
    test('forget method', async () => {
      const result = await authController.forget(authRegisterDto);

      expect(result).toEqual({ success: true });
    });

    test('reset method', async () => {
      const result = await authController.reset(authResetDto);

      expect(result).toEqual({ accessToken });
    });
  });

  describe('Flux of authentication authenticated', () => {
    test('me method', async () => {
      const result = await authController.me(userEntityList[0]);

      expect(result).toEqual(userEntityList[0]);
    });

    test('uploadPhoto method', async () => {
      const result = await authController.uploadPhoto(userEntityList[0], await getPhoto());

      expect(result).toEqual({ success: 'File Uploaded' });
    });
  });
});
