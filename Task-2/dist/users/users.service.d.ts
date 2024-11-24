import { User } from './user.model';
export declare class UsersService {
    private userModel;
    constructor(userModel: typeof User);
    resetProblemsFlags(): Promise<number>;
}
