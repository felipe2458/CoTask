import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TaskShares extends BaseSchema {
  protected tableName = 'task_shares'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('task_id').unsigned().references('tasks.id').onDelete('cascade')
      table.integer('user_id').unsigned().references('users.id').onDelete('cascade')
      table.string('permission').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
