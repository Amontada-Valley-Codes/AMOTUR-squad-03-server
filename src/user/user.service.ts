import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt' 
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    
    async Seed(){
        const admin = process.env.ADMIN_INITIAL_EMAIL;
        const password = process.env.ADMIN_INITIAL_PASSWORD;
        if(admin && password){
            const hashedpassword =await bcrypt.hash(password, 10)
            const criado = await this.prisma.users.upsert({
                where: { email: admin },
                update: {},
                create: {
                    email: admin,
                    password: hashedpassword,
                    role: 'ADMIN',
                },
            })
            if(criado){
                console.log("admin cadastrado")
            }
        }
    }
}
