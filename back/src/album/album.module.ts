import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import { TrackService } from "src/track/track.service";
import {AlbumController} from "./album.controller";
import {AlbumService} from "./album.service";
import {Album, AlbumSchema} from "./schemas/album.shema";
import {Track, TrackSchema} from "../track/schemas/track.schema";
import {Comment, CommentSchema} from "../track/schemas/comment.shema";
import {FileService} from "../file/file.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])
    ],
    controllers: [AlbumController],
    providers: [AlbumService, TrackService, FileService],
})
export class AlbumModule {}