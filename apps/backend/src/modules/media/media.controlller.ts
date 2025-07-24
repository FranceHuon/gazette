import { Controller, Get } from '@nestjs/common'
import { MediaService } from './media.service'

@Controller('medias')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
  ) {}

  @Get()
  async findAll() {
    const medias = await this.mediaService.findAll()
    console.warn('[MediaController] Médias trouvés:', medias.map(m => ({ id: m.id, name: m.name, urlRss: m.urlRss })))
    return medias
  }

  @Get('details')
  async getDetails() {
    return this.mediaService.getAllWithDetails()
  }

  @Get('mapping')
  async getMapping() {
    return this.mediaService.getMediaIdsBySource()
  }
}
