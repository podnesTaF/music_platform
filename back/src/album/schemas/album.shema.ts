import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import {Track} from "../../track/schemas/track.schema";
import {IsOptional} from "class-validator";

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
    @Prop()
    name: string;

    @Prop()
    description: string;


    @Prop()
    author: string;

    @Prop()
    @IsOptional()
    picture: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}], nullable: true})
    tracks: Track[];

}

export const AlbumSchema = SchemaFactory.createForClass(Album);