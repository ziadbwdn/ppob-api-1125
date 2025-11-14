// src/models/Service.js
const { EntitySchema } = require('typeorm');

const Service = new EntitySchema({
  name: 'Service',
  tableName: 'services',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    service_code: {
      type: 'varchar',
      length: 100,
      unique: true,
    },
    service_name: {
      type: 'varchar',
      length: 255,
    },
    service_icon: {
      type: 'text',
    },
    service_tariff: {
      type: 'integer',
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
});

module.exports = Service;
