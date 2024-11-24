import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from "./users/users.module";
import {User} from "./users/user.model";


@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'task_2',
            models: [User],
            autoLoadModels: true
        }),
        UsersModule
    ]
})
export class AppModule {}
