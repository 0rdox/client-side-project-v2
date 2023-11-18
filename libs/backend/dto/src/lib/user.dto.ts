import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';
import {
    ICreateUser,
    IUpdateUser,
    IUpsertUser,
} from '@client-side-project/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateUserDto implements ICreateUser {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;


    @IsString()
    @IsNotEmpty()
    password!: string;
}

// export class UpsertUserDto implements IUpsertUser {
//     @IsString()
//     @IsNotEmpty()
//     title!: string;

//     @IsString()
//     @IsNotEmpty()
//     description!: string;

//     @IsString()
//     @IsNotEmpty()
//     id!: string;

//     @IsBoolean()
//     @IsNotEmpty()
//     isVega!: boolean;

//     @IsDate()
//     @IsNotEmpty()
//     dateServed!: Date;

//     @IsString()
//     @IsNotEmpty()
//     sort!: UserSort;

//     @IsString()
//     @IsNotEmpty()
//     cook!: string;
// }

// export class UpdateUserDto implements IUpdateUser {
//     @IsString()
//     @IsOptional()
//     title!: string;

//     @IsString()
//     @IsOptional()
//     description!: string;

//     @IsBoolean()
//     @IsOptional()
//     completed!: boolean;
// }
