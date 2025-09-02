import db from "../../db/db.js";
import { CreateTrackShema, EditTrackShema } from "./racetrack.shema.js";

export class RaceTrackRepository {
  async create(racetrackDto: CreateTrackShema) {
    return await db("racetrack")
      .insert({
        name: racetrackDto.name,
        country: racetrackDto.country,
        kilometer: racetrackDto.kilometer,
        owner_id:racetrackDto.userId
      })
      .returning("id");
  }

  async getById(id: number) {
    return db("racetrack").select("*").where({ id }).first();
  }

  async delete(id: number) {
    return await db("racetrack").where({ id }).delete();
  }

  async edit(_editRaceTrackShema: EditTrackShema) {

    return await db("racetrack")
      .select("*")
      .where({ id: _editRaceTrackShema.id })
      .update({
        name: _editRaceTrackShema.name,
        country: _editRaceTrackShema.country,
        kilometer: _editRaceTrackShema.kilometer,
      })
      .returning("id");
  }

  async getAll() {
    return db("racetrack").select("*");
  }
}
