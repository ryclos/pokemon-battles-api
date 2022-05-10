import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRootMongooseInMemory } from '../../test/helpers/get-root-mongoose-in-memory';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

describe('UserService', () => {
  let service: UserService;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        getRootMongooseInMemory(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = testingModule.get<UserService>(UserService);
  });

  afterEach(async () => {
    await testingModule.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
