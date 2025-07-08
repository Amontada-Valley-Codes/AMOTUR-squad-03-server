import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @ApiOperation({summary: 'Registrar um usuário'})
    @ApiResponse({status:201, description: "Usuário criado com sucesso!!"})
    @ApiResponse({status:409, description: "Email ja esta em uso"})
    @Post('register')
    async registerUser(@Body()userData: RegisterUserDto) {
        return this.authService.registerUser(userData)
    }
    
    @ApiOperation({summary: 'Login de Usuário'})
    @ApiResponse({status:200, description: "OK"})
    @ApiResponse({status:401, description: "Credenciais inválidas"})
    @Post('login')
    async loginUser(@Body() credentials: LoginDto): Promise<LoginResponseDto>{
        return this.authService.login(credentials)
    }
}
