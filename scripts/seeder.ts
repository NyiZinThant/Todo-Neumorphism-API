import { faker } from '@faker-js/faker';
import db from '../config/database';

const seedTodo = async () => {
  try {
    console.log('Database starts seeding.');
    for (let i = 0; i < 20; i++) {
      const id = faker.string.uuid();
      const label = faker.hacker.phrase();
      const completed = faker.datatype.boolean(0.3);
      const date = faker.date.recent({ days: 20 });
      await db.query('INSERT INTO todo VALUES (?, ?, ?, ?)', [
        id,
        label,
        completed,
        date,
      ]);
      console.log(`Row ${i + 1} is inserted`);
    }
    console.log('Database seeded successfully.');
    process.exit(1);
  } catch (error) {
    console.error('Error seeding database: ', error);
    process.exit(1);
  }
};

seedTodo();
