import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    resetProblems(): Promise<{
        message: string;
    }>;
}
