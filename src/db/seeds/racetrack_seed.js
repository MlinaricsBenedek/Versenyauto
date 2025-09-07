import {faker} from "@faker-js/faker"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('racetrack').del()
    const tracks = [
  "Hungaroring", "Silverstone", "Monza", "Spa-Francorchamps", 
  "Suzuka", "Circuit de Monaco", "Nürburgring"
];
    const users = await knex('user').select('id');
    
    const racetrackes = Array.from({length:25}).map(()=>({
    name:faker.helpers.arrayElement(tracks),
    country:faker.location.country(),
    kilometer:faker.number.int({ min: 2, max: 10 }),
    owner_id:faker.helpers.arrayElement(users).id, 
  }))


  await knex('racetrack').insert(racetrackes);
};
