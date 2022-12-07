import {IsOptional} from "class-validator";

export class CreateTrackDto {
    readonly name;
    readonly artist;
    readonly text;

    readonly albumId;
}