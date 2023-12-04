import { integer, pgSchema, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const mySchema = pgSchema('my_schema');

export const usersSchema = mySchema.table('users', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 50 }).notNull(),
});

export const todosSchema = mySchema.table('todos', {
  id: serial('id').primaryKey().notNull(),
  title: varchar('title', { length: 50 }).notNull(),
  description: varchar('description', { length: 50 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  userId: integer('user_id').references(() => usersSchema.id),
});


export const userRelations = relations(usersSchema, ({ many }) => ({
  todos: many(todosSchema),
}));

export const todoRelations = relations(todosSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [todosSchema.userId],
    references: [usersSchema.id],
  })
}));
