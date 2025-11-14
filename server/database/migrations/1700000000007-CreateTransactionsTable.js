// database/migrations/1700000000007-CreateTransactionsTable.js
const { MigrationInterface, QueryRunner, Table, TableForeignKey } = require("typeorm");

module.exports = class CreateTransactionsTable1700000000007 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "invoice_number",
            type: "varchar",
            length: "100",
            isUnique: true,
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
          },
          {
            name: "transaction_type",
            type: "varchar",
            length: "50",
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "total_amount",
            type: "bigint",
          },
          {
            name: "service_code",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            columnNames: ["email"],
          },
          {
            columnNames: ["createdAt"],
          },
        ],
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.dropTable("transactions");
  }
};
