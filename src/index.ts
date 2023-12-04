import { db } from './db';
import { todosSchema, usersSchema } from './schema';

const main = async () => {
  await db.delete(todosSchema);
  await db.delete(usersSchema);

  const insertedUsers = await db.insert(usersSchema).values(
    [
      { name: 'John' },
      { name: 'Jane' }
    ]
  ).returning();

  await db.insert(todosSchema).values(
    [
      {
        title: 'Todo 1',
        description: 'Todo 1 description',
        userId: insertedUsers[0].id
      },
      {
        title: 'Todo 2',
        description: 'Todo 2 description',
        userId: insertedUsers[1].id
      }
    ]
  ).returning();

  const result = await db.query.usersSchema.findMany({
    with: {
      todos: true
    }
  });

  console.dir(result, { depth: null });
};

main();
