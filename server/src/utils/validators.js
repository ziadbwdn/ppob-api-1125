// src/utils/validators.js
const joi = require('joi');

const schemas = {
  register: joi.object({
    email: joi.string().email().required().messages({
      'string.email': 'Paramter email tidak sesuai format',
      'any.required': 'Email is required',
    }),
    password: joi.string()
      .min(8)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required',
      }),
    first_name: joi.string().max(100).required().messages({
      'any.required': 'first_name is required',
    }),
    last_name: joi.string().max(100).required().messages({
      'any.required': 'last_name is required',
    }),
  }),

  login: joi.object({
    email: joi.string().email().required().messages({
      'string.email': 'Paramter email tidak sesuai format',
      'any.required': 'Email is required',
    }),
    password: joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),
  }),

  createUser: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    username: joi.string().alphanum().min(3).max(20).required(),
  }),

  updateUser: joi.object({
    email: joi.string().email(),
    username: joi.string().alphanum().min(3).max(20),
    password: joi.string().min(8),
    isActive: joi.boolean(),
  }).min(1),

  createProfile: joi.object({
    userId: joi.string().uuid().required(),
    firstName: joi.string().max(100),
    lastName: joi.string().max(100),
    phone: joi.string().max(20),
    address: joi.string(),
    dateOfBirth: joi.date(),
    bio: joi.string(),
  }),

  updateProfile: joi.object({
    firstName: joi.string().max(100),
    lastName: joi.string().max(100),
    phone: joi.string().max(20),
    address: joi.string(),
    dateOfBirth: joi.date(),
    bio: joi.string(),
  }).min(1),

  updateProfileInfo: joi.object({
    first_name: joi.string().max(100),
    last_name: joi.string().max(100),
  }).min(1),

  topup: joi.object({
    top_up_amount: joi.number().integer().min(0).required().messages({
      'number.base': 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
      'number.min': 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
      'any.required': 'top_up_amount is required',
    }),
  }),

  transaction: joi.object({
    service_code: joi.string().required().messages({
      'any.required': 'service_code is required',
    }),
  }),

  transactionHistory: joi.object({
    limit: joi.number().integer().min(1),
    offset: joi.number().integer().min(0),
  }),
};

function validateRegister(data) {
  return schemas.register.validate(data, { abortEarly: false });
}

function validateLogin(data) {
  return schemas.login.validate(data, { abortEarly: false });
}

function validateCreateUser(data) {
  return schemas.createUser.validate(data, { abortEarly: false });
}

function validateUpdateUser(data) {
  return schemas.updateUser.validate(data, { abortEarly: false });
}

function validateCreateProfile(data) {
  return schemas.createProfile.validate(data, { abortEarly: false });
}

function validateUpdateProfile(data) {
  return schemas.updateProfile.validate(data, { abortEarly: false });
}

function validateUpdateProfileInfo(data) {
  return schemas.updateProfileInfo.validate(data, { abortEarly: false });
}

function validateTopup(data) {
  return schemas.topup.validate(data, { abortEarly: false });
}

function validateTransaction(data) {
  return schemas.transaction.validate(data, { abortEarly: false });
}

function validateTransactionHistory(data) {
  return schemas.transactionHistory.validate(data, { abortEarly: false });
}

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateUser,
  validateUpdateUser,
  validateCreateProfile,
  validateUpdateProfile,
  validateUpdateProfileInfo,
  validateTopup,
  validateTransaction,
  validateTransactionHistory,
};
