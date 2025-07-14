import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import { MediaSeeder } from '../../scripts/seed-media'
import { AuthGuard } from '../auth/auth.guard'
import { MediaService } from './media.service'

@Controller('medias')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly mediaSeeder: MediaSeeder,
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

  @Post('seed')
  @UseGuards(AuthGuard)
  async seed() {
    await this.mediaSeeder.seed()
    return { message: 'Médias créés avec succès' }
  }
}
