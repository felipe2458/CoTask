import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RevokedTokens extends BaseSchema {
  protected tableName = 'revoked_tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('token').notNullable().unique()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
