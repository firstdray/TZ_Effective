import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from "./users/users.module";
import {User} from "./users/user.model";
import {ConfigModule} from "@nestjs/config";
import * as process from "node:process";


@Module({
    imports: [
        ConfigModule.forRoot({
           envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User],
            autoLoadModels: true
        }),
        UsersModule
    ]
})
export class AppModule {}
