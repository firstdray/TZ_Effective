import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('reset-problems')
    async resetProblems() {
        const count = await this.usersService.resetProblemsFlags();
        return { message: `${count} Пользователи имели проблемы.` };
    }
}