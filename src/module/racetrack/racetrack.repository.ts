import db from "../../db/db.js";
import {
  CreateRaceTrackShema,
  editRaceTrackShema,
  EditRaceTrackShema,
} from "./racetrack.shema.js";

export class RaceTrackRepository {
  async create(racetrackDto: CreateRaceTrackShema) {
    return await db("racetrack")
      .insert({
        name: racetrackDto.name,
        country: racetrackDto.country,
        kilometer: racetrackDto.kilometer,
      })
      .returning("id");
  }

  async getById(id: number) {
    return db("racetrack").select("*").where({ id }).first();
  }

  async delete(id: number) {
    return await db("racetrack").where({ id }).delete();
  }

  async edit(_editRaceTrackShema: EditRaceTrackShema) {
    let data = editRaceTrackShema.parse(_editRaceTrackShema);
    return await db("racetrack")
      .select("*")
      .where({ id: data.id })
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
