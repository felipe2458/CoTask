import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export enum Status {
  PENDENTE = 'pendente',
  EM_ANDAMENTO = 'em_andamento',
  CONCLUIDO = 'concluido',
}

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public status: Status

  @column.date()
  public due_data: DateTime

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
