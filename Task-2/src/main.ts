import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";



async function main() {
    const PORT = 3000;
    const app = await NestFactory.create(AppModule);

    await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

main();