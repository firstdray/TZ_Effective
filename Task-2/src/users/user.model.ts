import {Column, DataType, Model, Table} from "sequelize-typescript";


@Table({tableName: "users", timestamps: false})
export class User extends Model<User>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    firstName: string;

    @Column({type: DataType.STRING})
    lastName: string;

    @Column({type: DataType.INTEGER})
    age: number;

    @Column({type: DataType.ENUM('male', 'female')})
    gender: 'male' | 'female';

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    hasProblems: boolean;
}