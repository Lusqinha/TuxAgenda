import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'services'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nome', 30).notNullable()
      table.string('descricao', 50).notNullable()
      table.integer('duracao_minutos').notNullable()
      table.float('preco').notNullable()
      table.integer('colaborator_id').unsigned().references('id').inTable('colaborators').onDelete('RESTRICT')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}