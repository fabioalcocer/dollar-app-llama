import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const productsTable = sqliteTable('products', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  stock: integer('stock').notNull(),
})
