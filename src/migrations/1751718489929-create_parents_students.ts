// migrations/CreateParents.ts
import {
  ForeignKey,
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

const table = 'parentStudent';

export class CreateParentsStudents1751718489929 implements MigrationInterface {
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
            name: 'parentId',
            type: 'uuid',
          },
          {
            name: 'studentId',
            type: 'uuid',
            isUnique: true,
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

    await Promise.all([
      queryRunner.createForeignKey(
        table,
        new TableForeignKey({
          columnNames: ['parentId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'parents',
        }),
      ),
      queryRunner.createIndex(
        table,
        new TableIndex({
          columnNames: ['parentId'],
        }),
      ),
      queryRunner.createForeignKey(
        table,
        new TableForeignKey({
          columnNames: ['studentId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'students',
        }),
      ),
      queryRunner.createIndex(
        table,
        new TableIndex({
          columnNames: ['studentId'],
        }),
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table);
  }
}
