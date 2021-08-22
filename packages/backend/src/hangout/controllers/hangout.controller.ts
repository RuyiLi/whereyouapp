import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CreateHangoutDto } from '../../dtos/create-hangout.dto';
import { HangoutService } from '../services/hangout.service';

@Controller('hangout')
export class HangoutController {
  constructor(private hangoutService: HangoutService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createHangout(@Body() body: CreateHangoutDto) {
    return await this.hangoutService.createHangout(body);
  }

  @Post('addUser')
  @UseGuards(JwtAuthGuard)
  async addToHangout(
    @Body() body: { hangoutId: string; usernameOrEmail: string },
  ) {
    const { hangoutId, usernameOrEmail } = body;
    return await this.hangoutService.addToHangout(hangoutId, usernameOrEmail);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getHangout(@Param('id') id: string) {
    return await this.hangoutService.getHangout(id);
  }
}
