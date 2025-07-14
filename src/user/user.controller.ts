import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll()
   }

   @Get(':id')
   findOne (@Param('id') id: string) {
        return this.userService.findOne(id)
   }

   @Put(':id')
   update(@Param('id') id: string, @Body() data: UpdateUserDto) {
      return this.userService.update(id, data)
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.userService.remove(id)
   }

}
