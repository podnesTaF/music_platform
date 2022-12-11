import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
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

    @Post(':id')
    pushTrack(
        @Param('id') albumId: ObjectId,
        @Body() ids: {trackId: ObjectId}) {
        return this.albumService.pushTrack(ids.trackId, albumId);
    }

    @Post('remove-track/:id')
    removeTrack(
        @Param('id') albumId: ObjectId,
        @Body() ids: {trackId: ObjectId}) {
        return this.albumService.removeTrack(ids.trackId, albumId);
    }

    @Get()
    getAll() {
        return this.albumService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id)
    }
}
