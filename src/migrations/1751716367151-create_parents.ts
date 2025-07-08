// migrations/CreateParents.ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const table = 'parents';

export class CreateParents1751716367151 implements MigrationInterface {
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
            name: 'motherName',
            type: 'text',
          },
          {
            name: 'fatherName',
            type: 'text',
          },
          {
            name: 'guardianName',
            type: 'text',
             isNullable: true,
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
            name: 'occupation',
            type: 'varchar',
            isNullable: true,
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
            name: 'relation',
            type: 'varchar',
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
