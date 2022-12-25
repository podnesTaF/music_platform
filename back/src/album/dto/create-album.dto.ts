import {IsOptional} from "class-validator";

export class CreateAlbumDto {
    readonly name: string;
    readonly author: string;
    readonly description: string;
    @IsOptional()
    readonly tracks: string;
}