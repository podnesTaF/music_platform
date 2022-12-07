import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {TrackController} from "./track.controller";
import {TrackService} from "./track.service";
import {Track, TrackSchema} from "./schemas/track.schema";
import {Comment, CommentSchema} from "./schemas/comment.shema";
import { FileService } from "../file/file.service";
import { AlbumService } from "src/album/album.service";
import {Album, AlbumSchema} from "../album/schemas/album.shema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
    ],
    controllers: [TrackController],
    providers: [TrackService, FileService, AlbumService]
})

export class TrackModule {
}