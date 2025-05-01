// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { ExclusionService } from './exclusion.service';
// import { CreateExclusionDto } from './dto/create-exclusion.dto';
// import { UpdateExclusionDto } from './dto/update-exclusion.dto';

// @Controller('exclusion')
// export class ExclusionController {
//   constructor(private readonly exclusionService: ExclusionService) {}

//   @Post()
//   create(@Body() createExclusionDto: CreateExclusionDto) {
//     return this.exclusionService.create(createExclusionDto);
//   }

//   @Get()
//   findAll() {
//     return this.exclusionService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.exclusionService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateExclusionDto: UpdateExclusionDto) {
//     return this.exclusionService.update(+id, updateExclusionDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.exclusionService.remove(+id);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ExclusionService } from './exclusion.service';
import { CreateExclusionDto } from './dto/create-exclusion.dto';
import { UpdateExclusionDto } from './dto/update-exclusion.dto';
import { Exclusion } from './entities/exclusion.entity';

@Controller('exclusions')
export class ExclusionController {
  constructor(private readonly exclusionService: ExclusionService) {}

  // Create a new exclusion
  @Post()
  async create(
    @Body() createExclusionDto: CreateExclusionDto,
  ): Promise<Exclusion> {
    return this.exclusionService.create(createExclusionDto);
  }

  // Get all exclusions
  @Get()
  async findAll(): Promise<Exclusion[]> {
    return this.exclusionService.findAll();
  }

  // Get a single exclusion by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Exclusion> {
    return this.exclusionService.findOne(id);
  }

  // Update an exclusion
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateExclusionDto: UpdateExclusionDto,
  ): Promise<Exclusion> {
    return this.exclusionService.update(id, updateExclusionDto);
  }

  // Delete an exclusion
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.exclusionService.remove(id);
  }
}
