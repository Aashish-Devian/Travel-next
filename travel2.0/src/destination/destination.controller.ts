import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Destination } from './entities/destination.entity';

@Controller('destinations')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  // Create a new destination
  @Post()
  async create(
    @Body() createDestinationDto: CreateDestinationDto,
  ): Promise<Destination> {
    return this.destinationService.create(createDestinationDto);
  }

  // Get all destinations
  @Get()
  async findAll(): Promise<Destination[]> {
    return this.destinationService.findAll();
  }

  // Get a single destination by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Destination> {
    return this.destinationService.findOne(id);
  }

  // Update a destination
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ): Promise<Destination> {
    return this.destinationService.update(id, updateDestinationDto);
  }

  // Delete a destination
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.destinationService.remove(id);
  }
}
