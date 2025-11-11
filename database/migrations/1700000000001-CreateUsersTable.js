// database/migrations/1700000000001-CreateUsersTable.js
const { MigrationInterface, QueryRunner, Table } = require("typeorm");

module.exports = class CreateUsersTable1700000000001 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "users",
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
            name: "username",
            type: "varchar",
            length: "100",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
          },
          {
            name: "isActive",
            type: "boolean",
            default: true,
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
    await queryRunner.dropTable("users");
  }
};
