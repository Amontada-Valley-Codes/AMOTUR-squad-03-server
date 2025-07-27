import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt' 
import { Prisma, Users } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    
    async onModuleInit() {
        // Este método será chamado assim que o módulo for inicializado
        console.log('Chamando o Seed');
        await this.Seed();
    }
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

    async findAll(): Promise<Users[]> {
        return this.prisma.users.findMany()
   }

   async findOne(id: string): Promise<Users | null> {
    const foundUser = await this.prisma.users.findUnique(
        {where:{id}}
    )

      if(!foundUser) {
         throw new NotFoundException(`Usuário com ID ${id} não encontrado!`)
      }

      return foundUser
   }

   async update(id: string, data:Prisma.UsersUpdateInput): Promise<Users | null> {
      const foundId = await this.prisma.users.findUnique({where: {id}})

      if(!foundId){
         throw new NotFoundException(`Usuário com ID ${id} não encontradp!`)
      }

      return await this.prisma.users.update({where: {id}, data})
   }

   async remove (id: string): Promise<Users | null> {
      try{
          return await this.prisma.users.delete({where: {id}})
      }catch {
         throw new NotFoundException(`Usuário com ID ${id} não encontradp!`)
      }
   }
}
