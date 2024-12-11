import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AppointmentReserved extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare data: DateTime
  
  @column()
  declare hora: string

  @column()
  declare appointment_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}