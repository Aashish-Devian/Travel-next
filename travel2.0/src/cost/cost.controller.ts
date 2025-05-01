// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { CostService } from './cost.service';
// import { CreateCostDto } from './dto/create-cost.dto';
// import { UpdateCostDto } from './dto/update-cost.dto';

// @Controller('cost')
// export class CostController {
//   constructor(private readonly costService: CostService) {}

//   @Post()
//   create(@Body() createCostDto: CreateCostDto) {
//     return this.costService.create(createCostDto);
//   }

//   @Get()
//   findAll() {
//     return this.costService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.costService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateCostDto: UpdateCostDto) {
//     return this.costService.update(+id, updateCostDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.costService.remove(+id);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CostService } from './cost.service';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';

@Controller('costs')
export class CostController {
  constructor(private readonly costService: CostService) {}

  @Post()
  async create(@Body() createCostDto: CreateCostDto) {
    return this.costService.create(createCostDto);
  }

  @Get()
  async findAll() {
    return this.costService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.costService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCostDto: UpdateCostDto) {
    return this.costService.update(id, updateCostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.costService.remove(id);
  }
}
