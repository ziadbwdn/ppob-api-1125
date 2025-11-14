// test/auth.test.js
const authService = require('../src/services/authService');
const userService = require('../src/services/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../src/services/userService');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should register a user and return a token', async () => {
    const registerData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'Password123',
    };
    const createdUser = {
      id: '123',
      ...registerData,
      password: 'hashedPassword',
    };
    const token = 'test_token';

    userService.create.mockResolvedValue(createdUser);
    jwt.sign.mockReturnValue(token);

    const result = await authService.register(registerData);

    expect(userService.create).toHaveBeenCalledWith(registerData);
    expect(jwt.sign).toHaveBeenCalled();
    expect(result.accessToken).toBe(token);
    expect(result.user.password).toBeUndefined();
  });

  test('should login a user and return a token', async () => {
    const email = 'test@example.com';
    const password = 'Password123';
    const user = {
      id: '123',
      email,
      username: 'testuser',
      password: 'hashedPassword',
    };
    const token = 'test_token';

    userService.findByEmail.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue(token);

    const result = await authService.login(email, password);

    expect(userService.findByEmail).toHaveBeenCalledWith(email);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    expect(jwt.sign).toHaveBeenCalled();
    expect(result.accessToken).toBe(token);
    expect(result.user.password).toBeUndefined();
  });
});
