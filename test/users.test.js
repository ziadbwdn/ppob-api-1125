// test/users.test.js
const userService = require('../src/services/userService');
const userRepository = require('../src/repositories/userRepository');

jest.mock('../src/repositories/userRepository');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a user', async () => {
    const userData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'Password123',
    };

    userRepository.create.mockResolvedValue({
      id: '123',
      ...userData,
      password: 'hashedPassword',
    });

    const result = await userService.create(userData);
    expect(result.email).toBe(userData.email);
    expect(userRepository.create).toHaveBeenCalled();
  });
});
