import { Injectable, Logger } from '@nestjs/common';
import {
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import {
  User as UserModel,
  UserDocument,
} from '@client-side-project/backend/features';

//import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtService } from '@nestjs/jwt';
import { IUser, IUserCredentials } from '@client-side-project/shared/api';
import { CreateUserDto } from '@client-side-project/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BehaviorSubject } from 'rxjs';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class AuthService {
  public currentUser$ = new BehaviorSubject<IUser | null>(null);
  private readonly CURRENT_USER = 'currentUser';

  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private neo4jService: Neo4jService
  ) {}

  async validateUser(credentials: IUser): Promise<any> {
    this.logger.log('validateUser');
    const user = await this.userModel.findOne({
      email: credentials.email,
    });
    if (user && user.password === credentials.password) {
      return user;
    }
    return null;
  }

  async login(credentials: IUserCredentials): Promise<IUser> {
    this.logger.log('login ' + credentials.emailAddress);
    return await this.userModel
      .findOne({
        email: credentials.emailAddress,
      })
      .select('+password')
      .exec()
      .then((user) => {
        if (user && user.password === credentials.password) {
          const payload = {
            user_id: user._id,
            user_name: user.name,
            user_email: user.email,
            user_role: user.role,
          };
          this.currentUser$.next(user);
          return {
            //todo remove this:
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: this.jwtService.sign(payload),
          };
        } else {
          const errMsg = 'Email not found or password invalid';
          this.logger.debug(errMsg);
          throw null;
        }
      })
      .catch((error) => {
        console.log('This error reached');
        return error;
      });
  }

  subscribeToCurrentUser(callback: (user: IUser | null) => void): void {
    this.currentUser$.subscribe(callback);
  }

  async register(user: CreateUserDto): Promise<IUser> {
    this.logger.log(`Register user ${user.name}`);
    if (await this.userModel.findOne({ email: user.email })) {
      this.logger.debug('user exists');
      throw new ConflictException('User already exist');
    }
    this.logger.debug('User not found, creating');
    const createdItem = await this.userModel.create(user);

    await this.addUserToNeo4j(createdItem);

    return createdItem;
  }

  async addUserToNeo4j(user: IUser): Promise<void> {
    Logger.log(user, 'addUserToNeo4j');

    await this.neo4jService
      .write(
        `CREATE (u:User {name: '${user.name}', _id: '${user._id}', email: '${user.email}', hasGallery: '${user.hasGallery}', role: '${user.role}', friends: '${user.friends}'}) RETURN u`
      )
      .then((result: any) => {
        Logger.log(result, 'result');
      });
  }
}
