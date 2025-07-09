import { Controller, Get } from '@nestjs/common'

@Controller('content')
export class ContentController {
  @Get()
  findAll(): string {
    return 'This action returns all content'
  }
}
