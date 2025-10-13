import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RevokedToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public token: string
}
