// src/config/swagger.js

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PPOB API',
      description: 'REST API for PPOB Payment Platform',
      version: '1.0.0',
      contact: {
        name: 'Check my Profile',
        url: 'https://github.com/ziadbwdn',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
      {
        url: 'https://api.nutech-integrasi.app/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for authentication',
        },
      },
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 0,
              description: 'Status code: 0 for success',
            },
            message: {
              type: 'string',
              description: 'Response message',
            },
            data: {
              type: 'object',
              nullable: true,
              description: 'Response data',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              description: 'Error status code (102, 103, 108, etc)',
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
            data: {
              type: 'null',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'user@nutech-integrasi.com',
            },
            first_name: {
              type: 'string',
              example: 'John',
            },
            last_name: {
              type: 'string',
              example: 'Doe',
            },
            profile_image: {
              type: 'string',
              nullable: true,
              example: 'https://example.com/image.jpg',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT authentication token',
            },
          },
        },
        Balance: {
          type: 'object',
          properties: {
            balance: {
              type: 'integer',
              example: 1000000,
              description: 'Current account balance',
            },
          },
        },
        Banner: {
          type: 'object',
          properties: {
            banner_name: {
              type: 'string',
              example: 'Banner 1',
            },
            banner_image: {
              type: 'string',
              example: 'https://nutech-integrasi.app/dummy.jpg',
            },
            description: {
              type: 'string',
              example: 'Lerem Ipsum Dolor sit amet',
            },
          },
        },
        Service: {
          type: 'object',
          properties: {
            service_code: {
              type: 'string',
              example: 'PAJAK',
            },
            service_name: {
              type: 'string',
              example: 'Pajak PBB',
            },
            service_icon: {
              type: 'string',
              example: 'https://nutech-integrasi.app/dummy.jpg',
            },
            service_tariff: {
              type: 'integer',
              example: 40000,
              description: 'Service cost in rupiah',
            },
          },
        },
        Transaction: {
          type: 'object',
          properties: {
            invoice_number: {
              type: 'string',
              example: 'INV17082023-001',
            },
            service_code: {
              type: 'string',
              example: 'PLN_PRABAYAR',
            },
            service_name: {
              type: 'string',
              example: 'PLN Prabayar',
            },
            transaction_type: {
              type: 'string',
              enum: ['TOPUP', 'PAYMENT'],
            },
            total_amount: {
              type: 'integer',
              example: 10000,
            },
            created_on: {
              type: 'string',
              format: 'date-time',
              example: '2023-08-17T10:10:10.000Z',
            },
          },
        },
        TransactionHistory: {
          type: 'object',
          properties: {
            offset: {
              type: 'integer',
              example: 0,
            },
            limit: {
              type: 'integer',
              example: 10,
            },
            records: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  invoice_number: {
                    type: 'string',
                    example: 'INV17082023-001',
                  },
                  transaction_type: {
                    type: 'string',
                    enum: ['TOPUP', 'PAYMENT'],
                  },
                  description: {
                    type: 'string',
                    example: 'Top Up balance',
                  },
                  total_amount: {
                    type: 'integer',
                    example: 100000,
                  },
                  created_on: {
                    type: 'string',
                    format: 'date-time',
                    example: '2023-08-17T10:10:10.000Z',
                  },
                },
              },
            },
          },
        },
      },
    },
    paths: {
      '/auth/registration': {
        post: {
          tags: ['Authentication'],
          summary: 'User Registration',
          description: 'Register a new user account',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'first_name', 'last_name', 'password'],
                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'user@nutech-integrasi.com',
                    },
                    first_name: {
                      type: 'string',
                      example: 'John',
                    },
                    last_name: {
                      type: 'string',
                      example: 'Doe',
                    },
                    password: {
                      type: 'string',
                      minLength: 8,
                      example: 'password123',
                      description: 'Password must be at least 8 characters',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Registration successful',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      {
                        properties: {
                          data: {
                            type: 'null',
                          },
                        },
                      },
                    ],
                  },
                  example: {
                    status: 0,
                    message: 'Registrasi berhasil silahkan login',
                    data: null,
                  },
                },
              },
            },
            400: {
              description: 'Invalid input parameters',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 102,
                    message: 'Paramter email tidak sesuai format',
                    data: null,
                  },
                },
              },
            },
          },
        },
      },
      '/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'User Login',
          description: 'Login with email and password to get JWT token',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'user@nutech-integrasi.com',
                    },
                    password: {
                      type: 'string',
                      minLength: 8,
                      example: 'password123',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/LoginResponse' },
                        },
                      },
                    ],
                  },
                  example: {
                    status: 0,
                    message: 'Login Sukses',
                    data: {
                      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    },
                  },
                },
              },
            },
            400: {
              description: 'Invalid email format',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 102,
                    message: 'Paramter email tidak sesuai format',
                    data: null,
                  },
                },
              },
            },
            401: {
              description: 'Wrong credentials',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 103,
                    message: 'Username atau password salah',
                    data: null,
                  },
                },
              },
            },
          },
        },
      },
      '/auth/profile': {
        get: {
          tags: ['Authentication'],
          summary: 'Get User Profile',
          description: 'Get authenticated user profile information',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Profile retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/User' },
                        },
                      },
                    ],
                  },
                  example: {
                    status: 0,
                    message: 'Sukses',
                    data: {
                      email: 'user@nutech-integrasi.com',
                      first_name: 'John',
                      last_name: 'Doe',
                      profile_image: 'https://example.com/image.jpg',
                    },
                  },
                },
              },
            },
            401: {
              description: 'Invalid or expired token',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 108,
                    message: 'Token tidak tidak valid atau kadaluwarsa',
                    data: null,
                  },
                },
              },
            },
          },
        },
      },
      '/auth/profile/update': {
        put: {
          tags: ['Authentication'],
          summary: 'Update User Profile',
          description: 'Update user profile information (first_name, last_name)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    first_name: {
                      type: 'string',
                      example: 'John Edited',
                    },
                    last_name: {
                      type: 'string',
                      example: 'Doe Edited',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Profile updated successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/User' },
                        },
                      },
                    ],
                  },
                  example: {
                    status: 0,
                    message: 'Update Pofile berhasil',
                    data: {
                      email: 'user@nutech-integrasi.com',
                      first_name: 'John Edited',
                      last_name: 'Doe Edited',
                      profile_image: 'https://example.com/image.jpg',
                    },
                  },
                },
              },
            },
            401: {
              description: 'Invalid or expired token',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 108,
                    message: 'Token tidak tidak valid atau kadaluwarsa',
                    data: null,
                  },
                },
              },
            },
          },
        },
      },
      '/auth/profile/image': {
        put: {
          tags: ['Authentication'],
          summary: 'Update Profile Image',
          description: 'Upload and update user profile image (JPEG or PNG)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  required: ['file'],
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                      description: 'Image file (JPEG or PNG only)',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Profile image updated successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/User' },
                        },
                      },
                    ],
                  },
                  example: {
                    status: 0,
                    message: 'Update Profile Image berhasil',
                    data: {
                      email: 'user@nutech-integrasi.com',
                      first_name: 'John',
                      last_name: 'Doe',
                      profile_image: 'https://example.com/new-image.jpg',
                    },
                  },
                },
              },
            },
            400: {
              description: 'Invalid image format',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 102,
                    message: 'Format Image tidak sesuai',
                    data: null,
                  },
                },
              },
            },
            401: {
              description: 'Invalid or expired token',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 108,
                    message: 'Token tidak tidak valid atau kadaluwarsa',
                    data: null,
                  },
                },
              },
            },
          },
        },
      },
      '/information/banner': {
        get: {
          tags: ['Information'],
          summary: 'Get Banners',
          description: 'Get all banners (public endpoint)',
          responses: {
            200: {
              description: 'Banners retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      {
                        properties: {
                          data: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Banner' },
                          },
                        },
                      },
                    ],
                  },
                  example: {
                    status: 0,
                    message: 'Sukses',
                    data: [
                      {
                        banner_name: 'Banner 1',
                        banner_image: 'https://nutech-integrasi.app/dummy.jpg',
                        description: 'Lerem Ipsum Dolor sit amet',
                      },
                      {
                        banner_name: 'Banner 2',
                        banner_image: 'https://nutech-integrasi.app/dummy.jpg',
                        description: 'Lerem Ipsum Dolor sit amet',
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      '/information/services': {
        get: {
          tags: ['Information'],
          summary: 'Get Services',
          description: 'Get all available services',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Services retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      {
                        properties: {
                          data: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Service' },
                          },
                        },
                      },
                    ],
                  },
                  example: {
                    status: 0,
                    message: 'Sukses',
                    data: [
                      {
                        service_code: 'PAJAK',
                        service_name: 'Pajak PBB',
                        service_icon: 'https://nutech-integrasi.app/dummy.jpg',
                        service_tariff: 40000,
                      },
                      {
                        service_code: 'PLN_PRABAYAR',
                        service_name: 'PLN Prabayar',
                        service_icon: 'https://nutech-integrasi.app/dummy.jpg',
                        service_tariff: 10000,
                      },
                    ],
                  },
                },
              },
            },
            401: {
              description: 'Invalid or expired token',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 108,
                    message: 'Token tidak tidak valid atau kadaluwarsa',
                    data: null,
                  },
                },
              },
            },
          },
        },
      },
      '/transaction/balance': {
        get: {
          tags: ['Transaction'],
          summary: 'Get Account Balance',
          description: 'Get current user account balance',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Balance retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/Balance' },
                        },
                      },
                    ],
                  },
                  example: {
                    status: 0,
                    message: 'Get Balance Berhasil',
                    data: {
                      balance: 1000000,
                    },
                  },
                },
              },
            },
            401: {
              description: 'Invalid or expired token',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 108,
                    message: 'Token tidak tidak valid atau kadaluwarsa',
                    data: null,
                  },
                },
              },
            },
          },
        },
      },
      '/transaction/topup': {
        post: {
          tags: ['Transaction'],
          summary: 'Top Up Balance',
          description: 'Add funds to account balance',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['top_up_amount'],
                  properties: {
                    top_up_amount: {
                      type: 'integer',
                      minimum: 0,
                      example: 1000000,
                      description: 'Amount must be number and >= 0',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Top up successful',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/Balance' },
                        },
                      },
                    ],
                  },
                  example: {
                    status: 0,
                    message: 'Top Up Balance berhasil',
                    data: {
                      balance: 2000000,
                    },
                  },
                },
              },
            },
            400: {
              description: 'Invalid amount',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 102,
                    message: 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
                    data: null,
                  },
                },
              },
            },
            401: {
              description: 'Invalid or expired token',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 108,
                    message: 'Token tidak tidak valid atau kadaluwarsa',
                    data: null,
                  },
                },
              },
            },
          },
        },
      },
      '/transaction/transaction': {
        post: {
          tags: ['Transaction'],
          summary: 'Make Payment Transaction',
          description: 'Process a payment transaction for a service',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['service_code'],
                  properties: {
                    service_code: {
                      type: 'string',
                      example: 'PAJAK',
                      description: 'Service code to purchase',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Transaction successful',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/Transaction' },
                        },
                      },
                    ],
                  },
                  example: {
                    status: 0,
                    message: 'Transaksi berhasil',
                    data: {
                      invoice_number: 'INV17082023-001',
                      service_code: 'PLN_PRABAYAR',
                      service_name: 'PLN Prabayar',
                      transaction_type: 'PAYMENT',
                      total_amount: 10000,
                      created_on: '2023-08-17T10:10:10.000Z',
                    },
                  },
                },
              },
            },
            400: {
              description: 'Service not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 102,
                    message: 'Service ataus Layanan tidak ditemukan',
                    data: null,
                  },
                },
              },
            },
            401: {
              description: 'Invalid or expired token',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 108,
                    message: 'Token tidak tidak valid atau kadaluwarsa',
                    data: null,
                  },
                },
              },
            },
          },
        },
      },
      '/transaction/transaction/history': {
        get: {
          tags: ['Transaction'],
          summary: 'Get Transaction History',
          description: 'Get user transaction history',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'offset',
              in: 'query',
              description: 'Number of records to skip (optional, default 0)',
              schema: {
                type: 'integer',
                minimum: 0,
              },
            },
            {
              name: 'limit',
              in: 'query',
              description: 'Number of records to return (optional)',
              schema: {
                type: 'integer',
                minimum: 1,
              },
            },
          ],
          responses: {
            200: {
              description: 'Transaction history retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      {
                        properties: {
                          data: { $ref: '#/components/schemas/TransactionHistory' },
                        },
                      },
                    ],
                  },
                  example: {
                    status: 0,
                    message: 'Get History Berhasil',
                    data: {
                      offset: 0,
                      limit: 3,
                      records: [
                        {
                          invoice_number: 'INV17082023-001',
                          transaction_type: 'TOPUP',
                          description: 'Top Up balance',
                          total_amount: 100000,
                          created_on: '2023-08-17T10:10:10.000Z',
                        },
                        {
                          invoice_number: 'INV17082023-002',
                          transaction_type: 'PAYMENT',
                          description: 'PLN Prabayar',
                          total_amount: 10000,
                          created_on: '2023-08-17T11:10:10.000Z',
                        },
                      ],
                    },
                  },
                },
              },
            },
            401: {
              description: 'Invalid or expired token',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  example: {
                    status: 108,
                    message: 'Token tidak tidak valid atau kadaluwarsa',
                    data: null,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [], // You can add JSDoc comments in route files as well
};

module.exports = swaggerOptions;
