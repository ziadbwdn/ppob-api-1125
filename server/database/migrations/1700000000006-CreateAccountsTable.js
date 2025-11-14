// database/migrations/1700000000006-CreateAccountsTable.js
const { MigrationInterface, QueryRunner, Table, TableForeignKey } = require("typeorm");

module.exports = class CreateAccountsTable1700000000006 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "accounts",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "balance",
            type: "bigint",
            default: 0,
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
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.dropTable("accounts");
  }
};
