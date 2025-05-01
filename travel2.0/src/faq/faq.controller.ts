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
import { FAQService } from './faq.service';
import { CreateFAQDto } from './dto/create-faq.dto';
import { UpdateFAQDto } from './dto/update-faq.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('faqs')
export class FAQController {
  constructor(private readonly faqService: FAQService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() createFAQDto: CreateFAQDto) {
    return this.faqService.create(createFAQDto);
  }

  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.faqService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFAQDto: UpdateFAQDto) {
    return this.faqService.update(id, updateFAQDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.faqService.remove(id);
  }
}
