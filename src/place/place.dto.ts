import { ApiProperty } from "@nestjs/swagger"
import { PartialType } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsObject, IsString, IsUrl } from "class-validator"

type images = string[]

type coordenadas = {
lat: number
lon: number
}

type contacts = {}
export class createplaceDto {
  @ApiProperty({example:"luar do sertão",description:"nome do lugar"})
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({message:"O nome é obrigatório"})
  name: string;

  @ApiProperty({example:"pousada",description:"tipo do lugar"})
  @IsString({ message: "O tipo deve ser uma string" })
  @IsNotEmpty({message:"O tipo é obrigatório"})
  type: string;

  @ApiProperty({example:"um lugar bom",description:"descrição do lugar"})
  @IsString({ message: "A descrição deve ser uma string" })
  @IsNotEmpty({message:"A descrição é obrigatório"})
  description: string;

  @ApiProperty({example:{"lat":-52525,"lon":5213566},description:"coordenadas do lugar"})
  @IsObject()
  coordinates: coordenadas ;

  @ApiProperty({example:{"telefone":"(88)8888888","site":"www.luardosertao.com.br","email":"luardosertao@email.com"},description:"contatos do lugar"})
  @IsObject()
  contacts: contacts;

  @ApiProperty({example:"http://luarDoSertao/logo.png",description:"logo do lugar"})
  @IsString({ message: "O link da logo deve ser uma string" })
  @IsUrl({},{message:"Deve ser uma  url"})
  logo: string 

  @ApiProperty({example:["http://img1.jpg","http://img2.jpg","http://img3.jpg"],description:"imagens do lugar"})
  @IsArray()
  @IsString({each: true, message: "Cada link de imagem deve ser uma string" }) 
  @IsNotEmpty({each:true, message:"Cada link deve ser obrigatório"})
  images: images
}

export class updateplaceDto extends PartialType(createplaceDto)   {}
