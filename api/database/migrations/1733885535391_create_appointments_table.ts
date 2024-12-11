import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nome_cliente', 80).notNullable()
      table.string('celular_cliente', 22).notNullable()
      table.string('cpf_cliente', 11).notNullable()
      table.integer('service_id').unsigned().references('id').inTable('services').onDelete('CASCADE')
      
      table.timestamp('datahora_inicio_agendamento').notNullable()
      table.timestamp('datahora_fim_agendamento').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}