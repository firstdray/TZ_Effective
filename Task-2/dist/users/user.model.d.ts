import { Model } from "sequelize-typescript";
export declare class User extends Model<User> {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: 'male' | 'female';
    hasProblems: boolean;
}
