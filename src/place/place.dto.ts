
type imagens = string[]
 


type coordenadas = {
lat: number
lon: number
}

type contacts = {}

export class createplaceDto {
  name: string;
  type: string;
  description: string;
  coordinates: coordenadas ;
  contacts: contacts;
  logo: string 
  imagens: imagens
}