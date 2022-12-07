import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {AlbumService} from "./album.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {ObjectId} from "mongoose";


@Controller('albums')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Post()
    create(@Body() dto: CreateAlbumDto) {
        return this.albumService.create(dto);
    }

    @Post('add-track')
    pushTrack(@Body() ids: {trackId: ObjectId, albumId: ObjectId}) {
        return this.albumService.pushTrack(ids.trackId, ids.albumId);
    }

    @Post('remove-track')
    removeTrack(@Body() ids: {trackId: ObjectId, albumId: ObjectId}) {
        return this.albumService.removeTrack(ids.trackId, ids.albumId);
    }

    @Get()
    getAll() {
        return this.albumService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id)
    }


}
