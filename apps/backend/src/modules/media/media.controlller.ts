import { Controller, Get } from '@nestjs/common'
import { MediaService } from './media.service'

@Controller('medias')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async findAll() {
    return this.mediaService.findAll()
  }
}
