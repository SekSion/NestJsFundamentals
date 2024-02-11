import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { getPhoto } from '../testing/get-photo.mock';

let fileService: FileService;

describe('FileService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  test('validate instance', () => {
    expect(fileService).toBeDefined();
  });

  describe('Test File Service', () => {
    test('upload method', async () => {
      const photo = await getPhoto();
      const filename = 'photo-test.png';
      fileService.upload(photo, filename);
    });
  });
});
