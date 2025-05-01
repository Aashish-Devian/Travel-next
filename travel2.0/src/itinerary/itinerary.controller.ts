// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { ItineraryService } from './itinerary.service';
// import { CreateItineraryDto } from './dto/create-itinerary.dto';
// import { UpdateItineraryDto } from './dto/update-itinerary.dto';

// @Controller('itinerary')
// export class ItineraryController {
//   constructor(private readonly itineraryService: ItineraryService) {}

//   @Post()
//   create(@Body() createItineraryDto: CreateItineraryDto) {
//     return this.itineraryService.create(createItineraryDto);
//   }

//   @Get()
//   findAll() {
//     return this.itineraryService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.itineraryService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateItineraryDto: UpdateItineraryDto) {
//     return this.itineraryService.update(+id, updateItineraryDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.itineraryService.remove(+id);
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
} from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('itineraries')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() createItineraryDto: CreateItineraryDto) {
    return this.itineraryService.create(createItineraryDto);
  }

  @Get()
  findAll() {
    return this.itineraryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itineraryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateItineraryDto: UpdateItineraryDto,
  ) {
    return this.itineraryService.update(id, updateItineraryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itineraryService.remove(id);
  }
}
