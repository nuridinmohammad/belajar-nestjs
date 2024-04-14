import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserController } from './user.controller';

describe('UserService', () => {
  let controller: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: [UserService],
    }).compile();

    controller = module.get<UserService>(UserService);
  });

  it('should can say hello', async () => {
    const response = controller.sayHello('Nuridin');

    expect(response).toBe('Hello, Nuridin');
  });
});
