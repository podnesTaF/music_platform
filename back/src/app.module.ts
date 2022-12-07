import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";
import * as path from 'path'
import {ServeStaticModule} from "@nestjs/serve-static";
import { AlbumModule } from "./album/album.module";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot('mongodb+srv://podnes:podnes1972@cluster0.qxwg2sg.mongodb.net/music-platform?retryWrites=true&w=majority'),
        FileModule,
        TrackModule,
        AlbumModule
    ]
})

export class AppModule {}