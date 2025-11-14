// database/migrations/1700000000004-CreateBannersTable.js
const { MigrationInterface, QueryRunner, Table } = require("typeorm");

module.exports = class CreateBannersTable1700000000004 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "banners",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "banner_name",
            type: "varchar",
            length: "255",
          },
          {
            name: "banner_image",
            type: "text",
          },
          {
            name: "description",
            type: "text",
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
    await queryRunner.dropTable("banners");
  }
};
