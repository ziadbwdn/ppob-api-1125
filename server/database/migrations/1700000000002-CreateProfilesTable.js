// database/migrations/1700000000002-CreateProfilesTable.js
const { MigrationInterface, QueryRunner, Table, TableForeignKey } = require("typeorm");

module.exports = class CreateProfilesTable1700000000002 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "profiles",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "userId",
            type: "uuid",
            isUnique: true,
          },
          {
            name: "firstName",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "lastName",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "phone",
            type: "varchar",
            length: "20",
            isNullable: true,
          },
          {
            name: "address",
            type: "text",
            isNullable: true,
          },
          {
            name: "dateOfBirth",
            type: "date",
            isNullable: true,
          },
          {
            name: "bio",
            type: "text",
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
      })
    );

    await queryRunner.createForeignKey(
      "profiles",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.dropTable("profiles");
  }
};
