import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1620406723212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

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
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "vehicle_id",
            type: "uuid",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.query(`
    ALTER TABLE users
    ADD CONSTRAINT fk_vehicle
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id);
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
