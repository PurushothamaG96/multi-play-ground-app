// migrations/CreateParents.ts
import {
  ForeignKey,
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

const table = 'classRoomYears';

export class CreateClassRoomYears1751718998381 implements MigrationInterface {
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
            name: 'year',
            type: 'int',
          },
          {
            name: 'classRoomId',
            type: 'uuid',
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
          columnNames: ['classRoomId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'classRooms',
        }),
      ),
      queryRunner.createIndex(
        table,
        new TableIndex({
          columnNames: ['classRoomId'],
        }),
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table);
  }
}
