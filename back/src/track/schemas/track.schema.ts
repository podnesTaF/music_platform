import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import * as mongoose from 'mongoose';
import {Album} from "../../album/schemas/album.shema";

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop()
    artist: string;

    @Prop()
     listens: number;

    @Prop()
    picture: string;

    @Prop()
    text: string;

    @Prop()
    audio: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Album', nullable: true})
    album: Album;

    @Prop({type : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
    comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);