import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointment_reserveds'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.date('data').notNullable()
      table.string('hora').notNullable()
      table.integer('appointment_id').unsigned().references('id').inTable('appointments').onDelete('RESTRICT')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}