import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tasks extends BaseSchema {
  protected tableName = 'tasks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.enum('status', ['pendente', 'em_andamento', 'concluido']).notNullable()
      table.dateTime('due_data').notNullable()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
