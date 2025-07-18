import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Param } from '@nestjs/common';
import { MaresService } from './mares.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('mares')
export class MaresController {

  constructor(private readonly maresService: MaresService) {}


    @Get(':data')
    @ApiOperation({ summary: 'Dados de maré por data' })
    @ApiResponse({ status: 200, description: "Dados de maré encotrado com sucesso!!" })
    @ApiResponse({ status: 404, description: "Dados de maré não encontrado nessa data" })
    @ApiParam({ name: 'data', type: String, description: 'data', example: "2025-07-30" })
    @HttpCode(HttpStatus.OK)
    async getMaresPorData(@Param('data') data:string): Promise<any> {
        const mareDoDia = await this.maresService.getMaresDeUmaData(data)

        if (!mareDoDia) {
        throw new NotFoundException(`Dados de maré não encontrados para a data: ${data}`);
        }
        return mareDoDia;
    }
}
