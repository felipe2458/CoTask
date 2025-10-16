import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export enum Permission {
  READ = 'read',
  EDIT = "edit"
}

export default class TaskShare extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public task_id: number

  @column()
  public user_id: number

  @column()
  public permission: Permission;
}
