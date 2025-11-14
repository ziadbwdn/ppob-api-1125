// database/migrations/1700000000005-CreateServicesTable.js
const { MigrationInterface, QueryRunner, Table } = require("typeorm");

module.exports = class CreateServicesTable1700000000005 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "services",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "service_code",
            type: "varchar",
            length: "100",
            isUnique: true,
          },
          {
            name: "service_name",
            type: "varchar",
            length: "255",
          },
          {
            name: "service_icon",
            type: "text",
          },
          {
            name: "service_tariff",
            type: "integer",
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
    await queryRunner.dropTable("services");
  }
};
