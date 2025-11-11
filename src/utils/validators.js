// src/utils/validators.js
const joi = require('joi');

const schemas = {
  register: joi.object({
    email: joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, lowercase letter, and number',
        'any.required': 'Password is required',
      }),
    username: joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required()
      .messages({
        'string.alphanum': 'Username can only contain alphanumeric characters',
        'string.min': 'Username must be at least 3 characters',
        'string.max': 'Username must not exceed 20 characters',
        'any.required': 'Username is required',
      }),
  }),

  login: joi.object({
    email: joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: joi.string().required().messages({
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

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateUser,
  validateUpdateUser,
  validateCreateProfile,
  validateUpdateProfile,
};
