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
    const racetrackes = Array.from({length:25}).map(()=>({
    name:faker.helpers.arrayElement(tracks),
    country:faker.location.country(),
    kilometer:faker.number.int({ min: 2, max: 10 }),
  }))


  await knex('racetrack').insert(racetrackes);
};
