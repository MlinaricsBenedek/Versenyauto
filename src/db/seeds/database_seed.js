import {faker} from "@faker-js/faker"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  
await knex('user').del();
  const roles = ['versenyzo', 'versenyiranyito'];

  const users = Array.from({ length: 5 }).map(() => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(roles),
  password: faker.internet.password(),
  refreshToken: faker.string.alphanumeric(64),
  created_at: new Date(),
  updated_at: new Date()
}));

await knex('user').insert(users);
}