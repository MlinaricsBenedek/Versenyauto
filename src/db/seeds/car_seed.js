/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import {faker} from "@faker-js/faker"

export async function seed(knex) {
   
    await knex('car').del()
    const users = await knex('user').select('id');

const cars = Array.from({ length: 5 }).map(() => ({
  brand: faker.vehicle.vehicle(),
  type: faker.vehicle.model(),
  horsepower: faker.number.int({ min: 50, max: 800 }),
  user_id: faker.helpers.arrayElement(users).id, 
  created_at: new Date(),
  updated_at: new Date()
}));
  await knex('car').insert(cars)
};
