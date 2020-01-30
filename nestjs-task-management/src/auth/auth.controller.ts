import {Body, Controller, Logger, Post, ValidationPipe} from '@nestjs/common';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {

    private logger = new Logger('AuthController');

    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}
