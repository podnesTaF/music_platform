import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Album, AlbumDocument} from "./schemas/album.shema";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {Track, TrackDocument} from "../track/schemas/track.schema";
import {Comment, CommentDocument} from "../track/schemas/comment.shema";
import {FileService} from "../file/file.service";

@Injectable()
export class AlbumService {
    constructor(@InjectModel(Album.name) private albumModel: Model<AlbumDocument>, @InjectModel(Track.name) private trackModel: Model<TrackDocument>, @InjectModel(Comment.name) private commentModel: Model<CommentDocument>, private fileService: FileService, ){}

    async create(dto: CreateAlbumDto): Promise<Album> {
        console.log(dto)
        const album = await this.albumModel.create({...dto, tracks: []})
        return album
    }
    async getAll() {
        return this.albumModel.find();
    }

    async getOne(id: ObjectId): Promise<Album>{
        return this.albumModel.findById(id).populate('tracks')
    }

    async pushTrack(trackId: ObjectId, albumId: ObjectId) {
        const album = await this.albumModel.findById(albumId)
        const originalTrack = await this.trackModel.findById(trackId)
        album.tracks.push(originalTrack)
        originalTrack.album = album.id
        await album.save()
        await originalTrack.save()
        return `Track: ${trackId} added to album: ${albumId}`
    }

    async removeTrack(trackId: ObjectId, albumId: ObjectId): Promise<ObjectId> {
        let album = await this.albumModel.findById(albumId)
        album.tracks = album.tracks.filter(track => track.toString() !== trackId.toString())
        await album.save()
        const track = await this.trackModel.findById(trackId)
        track.album = null
        await track.save()
        return trackId
    }

    delete(id: ObjectId) {
        return this.albumModel.findByIdAndDelete(id)
    }
}