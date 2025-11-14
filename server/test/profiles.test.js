// test/profiles.test.js
const profileService = require('../src/services/profileService');
const profileRepository = require('../src/repositories/profileRepository');

jest.mock('../src/repositories/profileRepository');

describe('ProfileService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a profile', async () => {
    const profileData = {
      userId: '123',
      firstName: 'Test',
      lastName: 'User',
    };

    profileRepository.create.mockResolvedValue({
      id: '456',
      ...profileData,
    });

    const result = await profileService.create(profileData);
    expect(result.firstName).toBe(profileData.firstName);
    expect(profileRepository.create).toHaveBeenCalledWith(profileData);
  });
});
