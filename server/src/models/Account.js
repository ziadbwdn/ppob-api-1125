// src/models/Account.js
const { EntitySchema } = require('typeorm');

const Account = new EntitySchema({
  name: 'Account',
  tableName: 'accounts',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    email: {
      type: 'varchar',
      length: 255,
      unique: true,
    },
    balance: {
      type: 'bigint',
      default: 0,
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

module.exports = Account;
