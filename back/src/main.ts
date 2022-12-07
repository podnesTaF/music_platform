import { NestFactory } from "@nestjs/core";
import {AppModule} from "./app.module";

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule)
        app.enableCors()
        await app.listen(PORT, () => console.log('listening on port 5000'))
    } catch (err) {
        console.log(err)
    }
}

start()