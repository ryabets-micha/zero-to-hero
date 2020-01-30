import {EntityRepository, Repository} from 'typeorm';
import {ConflictException, InternalServerErrorException, Logger} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {User} from './user.entity';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    private logger = new Logger('UserRepository');

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = this.create();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
            this.logger.debug(`New user is registered with the name"${username}"`);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username already exist');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({username});

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}