import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Appointment extends BaseModel {
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome_cliente: string

  @column()
  declare celular_cliente: string

  @column()
  declare cpf_cliente: string

  @column()
  declare service_id: number

  @column()
  declare datahora_inicio_agendamento: DateTime

  @column()
  declare datahora_fim_agendamento: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}