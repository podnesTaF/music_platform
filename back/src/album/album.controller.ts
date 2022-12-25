import {Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {AlbumService} from "./album.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {ObjectId} from "mongoose";
import {FileFieldsInterceptor} from "@nestjs/platform-express";


@Controller('albums')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const {picture} = files;
        return this.albumService.create(picture[0], dto);
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
