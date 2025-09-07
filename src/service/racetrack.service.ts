
import { createTrackSHema, requestTrackShema, RequestTrackShema, TrackShema, trackSHema, tracksSHema } from "../dto/racetrack.shema.js";
import { BadRequestError, NotFoundError, UnprocessableEntity } from "../error/errors.js";
import { RaceTrackRepository } from "../repository/racetrack.repository.js";

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
      let raceTrack = tracksSHema.safeParse(tracks);
      return raceTrack.data;
  }

  async getById(id: number) {
   let track =await this.raceTrackRepository.getById(id);
    if(!track)
    {
        throw new NotFoundError("Resource not found");
    }
    let raceTrack = trackSHema.safeParse(track);
    if(!raceTrack.success) throw new UnprocessableEntity();
    return raceTrack.data;
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

  async edit(data: RequestTrackShema,paramId:number) {
    let currentTrack:TrackShema = await this.getById(paramId);
    if(!currentTrack) throw new NotFoundError("resource not found");
    let editedTrack:TrackShema = {id:currentTrack.id,owner_id:currentTrack.owner_id,...data }
    await this.raceTrackRepository.edit(editedTrack);
  }
}
