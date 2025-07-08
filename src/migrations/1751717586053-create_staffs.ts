// migrations/CreateParents.ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const table = 'staffs';

export class CreateStaffs1751717586053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: table,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'email',
            type: 'text',
          },
          {
            name: 'phone',
            type: 'text',
          },
          {
            name: 'city',
            type: 'text',
          },
          {
            name: 'fullAddress',
            type: 'text',
          },
          {
            name: 'userType',
            type: 'int',
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'isArchived',
            type: 'boolean',
            default: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table);
  }
}
