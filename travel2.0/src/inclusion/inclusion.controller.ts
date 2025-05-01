// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { InclusionService } from './inclusion.service';
// import { CreateInclusionDto } from './dto/create-inclusion.dto';
// import { UpdateInclusionDto } from './dto/update-inclusion.dto';

// @Controller('inclusion')
// export class InclusionController {
//   constructor(private readonly inclusionService: InclusionService) {}

//   @Post()
//   create(@Body() createInclusionDto: CreateInclusionDto) {
//     return this.inclusionService.create(createInclusionDto);
//   }

//   @Get()
//   findAll() {
//     return this.inclusionService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.inclusionService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateInclusionDto: UpdateInclusionDto) {
//     return this.inclusionService.update(+id, updateInclusionDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.inclusionService.remove(+id);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { InclusionService } from './inclusion.service';
import { CreateInclusionDto } from './dto/create-inclusion.dto';
import { UpdateInclusionDto } from './dto/update-inclusion.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('inclusions')
export class InclusionController {
  constructor(private readonly inclusionService: InclusionService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() createInclusionDto: CreateInclusionDto) {
    return this.inclusionService.create(createInclusionDto);
  }

  /**
   * ! @ This is for the get and update inclusions for a specific trip
   */

  // Endpoint to fetch inclusions for a specific trip
  @Get('trip/:tripId')
  async getInclusionsForTrip(@Param('tripId') tripId: number) {
    console.log('tripId', tripId);

    return this.inclusionService.getInclusionsForTrip(tripId);
  }

  @Put('edit/:tripId/:inclusionId')
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  async updateInclusion(
    @Param('tripId') tripId: number,
    @Param('inclusionId') inclusionId: number,
    @Body() updateInclusionDto: UpdateInclusionDto,
  ) {
    return this.inclusionService.updateInclusion(
      inclusionId,
      tripId,
      updateInclusionDto,
    );
  }
  /**
   * ! @ This is for the get and update inclusions for a specific trip
   */

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.inclusionService.remove(id);
  }
}
