import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVehiclesTable1620405312410 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "vehicles",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "model",
            type: "varchar",
          },
          {
            name: "brand",
            type: "varchar",
          },
          {
            name: "year",
            type: "integer",
          },
          {
            name: "color",
            type: "varchar",
          },
          {
            name: "vehicle_type",
            type: "varchar",
          },
          {
            name: "plate_number",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "mileage",
            type: "integer",
          },
          {
            name: "image",
            type: "varchar",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("vehicles");
  }
}
