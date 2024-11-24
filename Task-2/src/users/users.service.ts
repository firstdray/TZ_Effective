import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
    ) {}

    async resetProblemsFlags(): Promise<number> {
        const usersProblems = await this.userModel.count({ where: { hasProblems: true } });
        await this.userModel.update({ hasProblems: false }, { where: { hasProblems: true } });
        return usersProblems;
    }
}