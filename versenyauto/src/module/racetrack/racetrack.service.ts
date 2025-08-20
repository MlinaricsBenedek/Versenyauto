import { da } from "zod/locales";
import { RaceTrackRepository } from "./racetrack.repository.js";
import { CreateRaceTrackShema, EditRaceTrackShema } from "./racetrack.shema.js";
import { NotFoundError } from "../../errors/error.js";

export class RaceTrackService {
  private raceTrackRepository: RaceTrackRepository;
  constructor() {
    this.raceTrackRepository = new RaceTrackRepository();
  }

  async getAll() {
    try {
      let tracks=await this.raceTrackRepository.getAll();
      if(!tracks)
      {
          throw new NotFoundError("Resource not found");
      }
    } catch (error) {
      return new Error("Can't access to data" + error);
    }
  }

  async getById(id: number) {
    try {
      let track =await this.raceTrackRepository.getById(id);
    if(!track)
    {
        throw new NotFoundError("Resource not found");
    }
    } catch (error) {
      return new Error("Can't access to data");
    }
  }

  async delete(id: number) {
    try {
      let deletedRecords = await this.raceTrackRepository.delete(id);
      if (deletedRecords === 0) {
         throw new NotFoundError("Resource not found");
      }
    } catch (error) {
      return new Error("Cant access to the database");
    }
  }

  async create(data: CreateRaceTrackShema) {
    try {
      await this.raceTrackRepository.create(data);
    } catch (error) {
      throw new Error("creatnél bukunk el " + error);
    }
  }

  async edit(data: EditRaceTrackShema) {
    try {
      await this.raceTrackRepository.edit(data);
    } catch (error) {
      throw new Error("itt bukott el" + error);
    }
  }
}
