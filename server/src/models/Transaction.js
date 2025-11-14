// src/models/Transaction.js
const { EntitySchema } = require('typeorm');

const Transaction = new EntitySchema({
  name: 'Transaction',
  tableName: 'transactions',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    invoice_number: {
      type: 'varchar',
      length: 100,
      unique: true,
    },
    email: {
      type: 'varchar',
      length: 255,
    },
    transaction_type: {
      type: 'varchar',
      length: 50,
    },
    description: {
      type: 'text',
      nullable: true,
    },
    total_amount: {
      type: 'bigint',
    },
    service_code: {
      type: 'varchar',
      length: 100,
      nullable: true,
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

module.exports = Transaction;
