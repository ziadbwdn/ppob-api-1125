// database/migrations/1700000000003-AddFieldsToUsersTable.js
const { MigrationInterface, QueryRunner, TableColumn } = require("typeorm");

module.exports = class AddFieldsToUsersTable1700000000003 {
  async up(queryRunner) {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "first_name",
        type: "varchar",
        length: "100",
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "last_name",
        type: "varchar",
        length: "100",
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "profile_image",
        type: "text",
        isNullable: true,
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("users", "profile_image");
    await queryRunner.dropColumn("users", "last_name");
    await queryRunner.dropColumn("users", "first_name");
  }
};
