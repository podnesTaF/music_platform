import {Injectable} from "@nestjs/common";
import {Model, ObjectId} from "mongoose";
import {Track, TrackDocument} from "./schemas/track.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Comment, CommentDocument} from "./schemas/comment.shema";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileService, FileType} from "../file/file.service";
import {Album, AlbumDocument} from "../album/schemas/album.shema";
import {AlbumService} from "../album/album.service";

@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>, private fileService: FileService,
                @InjectModel(Album.name) private albumModel: Model<AlbumDocument>, private albumService: AlbumService) {}
    async create(dto: CreateTrackDto, picture, audio): Promise<Track>{

        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        let track;
        if(dto.albumId) {
             track = await this.trackModel.create({...dto, album: dto.albumId, listens: 0, audio: audioPath, picture: picturePath})
            const album = await this.albumModel.findById(dto.albumId)
            album.tracks.push(track.id)
            await album.save()
            return track
        } else {
            track = await this.trackModel.create({...dto, album: dto.albumId, listens: 0, audio: audioPath, picture: picturePath})
            return track;
        }

    }

    async getAll(offset = 0, count = 3){
        const tracks = await this.trackModel.find().limit(+count + +offset)
        return tracks;
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id)
        return track
    }

    async delete(id: ObjectId): Promise<ObjectId>{
        const track = await this.trackModel.findById(id)
        const album = await this.albumModel.findById(track.album)
        if(album) {
            album.tracks = album.tracks.filter(track => track.toString() !== id.toString())
            await album.save()
        }
        await this.trackModel.findByIdAndDelete(id);
        return track.id
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.commentModel.create({...dto})
        track.comments.push(comment.id)
        await track.save();
        return comment;
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id)
        track.listens++
        track.save();
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })

        return tracks;
    }
}