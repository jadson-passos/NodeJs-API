import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1618957441816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns:[
              {
                  name: 'id',
                  type: 'varchar',
                  isPrimary: true,
                  generationStrategy: 'uuid',
              },
 
              {
                name: 'email',
                type: 'varchar',                
              },
 
              {
                name: 'password',
                type: 'varchar',                
              },



            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
