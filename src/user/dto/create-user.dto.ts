import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class CreteUserDto {
    @ApiProperty({
        example:'jonas@gmail.com',
        description:'Email do usuário'
    })
    @IsEmail({}, {message: "O email precisa ser válido"})
    email: string
    
    @ApiProperty({example:"jose1234",description:"senha do usuário"})
    @IsString()
    @MinLength(6)
    password: string
}
