
import { RaceTrackRepository } from "./racetrack.repository.js";
import { createTrackSHema, editTrackSHema, requestTrackShema, RequestTrackShema } from "./racetrack.shema.js";
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
      return tracks;
  }

  async getById(id: number) {
   let track =await this.raceTrackRepository.getById(id);
    if(!track)
    {
        throw new NotFoundError("Resource not found");
    }
    return track;
  }

  async delete(id: number) {
      let deletedRecords = await this.raceTrackRepository.delete(id);
      if (deletedRecords === 0) {
         throw new NotFoundError("Resource not found");
      }
  }

  async create(data: RequestTrackShema,user_Id:number) {
    let trackShema=createTrackSHema.safeParse({...data,userId:user_Id});
    if(!trackShema.success) throw new BadRequestError();
    await this.raceTrackRepository.create(trackShema.data);
  }

  async edit(data: RequestTrackShema,user_Id:number,paramId:number) {
    let trackShema=editTrackSHema.safeParse({...data,userId:user_Id,id:paramId});
    if(!trackShema.success) throw new BadRequestError();
    await this.raceTrackRepository.edit(trackShema.data);
  }
}
