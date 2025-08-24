
import { RaceTrackRepository } from "./racetrack.repository.js";
import { CreateRaceTrackShema, EditRaceTrackShema } from "./racetrack.shema.js";
import { BadRequestError, NotFoundError } from "../../error/errors.js";

export class RaceTrackService {
  private raceTrackRepository: RaceTrackRepository;
  constructor() {
    this.raceTrackRepository = new RaceTrackRepository();
  }

  async getAll() {
      let tracks=await this.raceTrackRepository.getAll();
      if(!tracks)
      {
          throw new NotFoundError("Resource not found");
      }
  }

  async getById(id: number) {
   let track =await this.raceTrackRepository.getById(id);
    if(!track)
    {
        throw new NotFoundError("Resource not found");
    }
  }

  async delete(id: number) {
   
      let deletedRecords = await this.raceTrackRepository.delete(id);
      if (deletedRecords === 0) {
         throw new NotFoundError("Resource not found");
      }
  }

  async create(data: CreateRaceTrackShema) {
    await this.raceTrackRepository.create(data);
  }

  async edit(data: EditRaceTrackShema) {
    await this.raceTrackRepository.edit(data);
  }
}
