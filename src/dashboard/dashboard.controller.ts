import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}


    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Get(':data')
    @ApiOperation({ summary: 'Dados para dashboard' })
    @ApiResponse({ status: 200, description: "Dados retornados com sucesso!!" })
    @ApiParam({ name: 'data', type: String, description: 'data de hoje', example: "2025-07-30" })
    @HttpCode(HttpStatus.OK)  
    async quantidade(@Param('data')data: string): Promise<{totalDeLugares: number, totalDeUsers: number, lugaresPorTipo:{ type: string; quantidade: number; }[], lugaresPorRegiao:{ location: string; quantidade: number; }[],contagemlogados:number}> {
        const totalDeLugares = await this.dashboardService.contarLugares()
        const totalDeUsers = await this.dashboardService.contarUsers()
        const lugaresPorTipo = await this.dashboardService.contarLocaisPorTipo()
        const lugaresPorRegiao = await this.dashboardService.contarLocaisPorRegiao()
        const count = await this.dashboardService.countLoggedInUsersForDay(data)
        return {
            totalDeLugares: totalDeLugares,
            totalDeUsers: totalDeUsers,
            lugaresPorTipo: lugaresPorTipo,
            lugaresPorRegiao: lugaresPorRegiao,
            contagemlogados: count
        }
    }
}
