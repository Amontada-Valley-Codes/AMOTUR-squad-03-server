import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt' 
import { LoginDto } from './dto/login.dto';
import { Users } from '@prisma/client';
import { DateTime } from 'luxon';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
        private httpService: HttpService

    ){}

    async registerUser(userData: RegisterUserDto) {
        const userExists = await this.prisma.users.findUnique({
            where: {email: userData.email}
        })
    
        if(userExists) {
            throw new ConflictException("Email ja esta em uso")
        }
        
        const hashedpassword = await bcrypt.hash(userData.password, 10)
        const newUser = await this.prisma.users.create({
          data: {
            email: userData.email,
            password: hashedpassword
          },
          select: {
            id: true,
            email: true,
            role: true,

          } 
        })
        return newUser
    }

    async validateUser(email: string, password: string) {
      const user = await this.prisma.users.findUnique({where: {email}})

      if(!user) throw new UnauthorizedException('Credencíais inválidas!')

      if(!user.password) throw new UnauthorizedException(
        'Usuário não possui senha definida (Logar com o Google)'
      )

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch) throw new UnauthorizedException('Credencíais inválidas!')

      return user;
    }

    async login(credentials: LoginDto) {
      const user = await this.validateUser(
        credentials.email,
        credentials.password
      )
      const hoje = new Date();
      console.log(hoje)
      const nowInBrasilia1 =DateTime.fromISO(DateTime.utc().toISO(), { zone: 'utc' }).setZone('America/Sao_Paulo');

      console.log(nowInBrasilia1.toJSDate());
console.log('UTC:', DateTime.utc().toISO());
console.log('Local:', DateTime.local().toISO());
console.log('Brasília:', DateTime.now().setZone('America/Sao_Paulo').toISO());
// 1. Obter a hora UTC de um serviço externo confiável
      // World Time API para exemplo: http://worldtimeapi.org/api/timezone/Etc/UTC
      const response = await firstValueFrom(this.httpService.get('https://worldtimeapi.org/api/timezone/Etc/UTC'));
      const externalTimestampUTC = response.data.datetime; // Ex: "2025-07-27T23:59:00.000000+00:00"

      // 2. Criar um DateTime a partir do timestamp UTC e então converter para Brasília
      const nowInBrasilia = DateTime.fromISO(externalTimestampUTC, { zone: 'utc' }).setZone('America/Sao_Paulo');

      console.log(`Data/hora EXTERNA convertida para Brasília: ${nowInBrasilia.toISO()}`);
      

await this.prisma.users.update({
        where: { id: user.id },
        data: { lastLoginAt: '2025-07-27' },
      })
      const payload = {
        userId: user.id,
        email: user.email,
        role: user.role
      }
      return {
        access_token: this.jwt.sign(payload)
      }
    }

    async findOrCreateGoogleUser({ googleId, email }){
        let user = await this.prisma.users.findUnique({
          where: { googleId }
        })

        if(!user){
          const findEmail = await this.prisma.users.findUnique({where: {email}})
          if(findEmail) throw new ConflictException('credenciais já cadastradas')
          user = await this.prisma.users.create({
            data: {
              email,
              googleId
            }
          })
        }
      const hoje = new Date();

      const dia = hoje.getDate();
      const mes = String(hoje.getMonth() + 1).padStart(2,'0');
      const ano= hoje.getFullYear();
      const data = `${ano}-${mes}-${dia}`;
      await this.prisma.users.update({
        where: { id: user.id },
        data: { lastLoginAt: data },
      })
        return user
    }

    async signJwtForUser(user: Users){
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role
      }
      return this.jwt.sign(payload)
    }

}
