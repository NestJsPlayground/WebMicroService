import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TwitterController } from './web.controller';
import { entryProviders } from './web.providers';

@Module({
    controllers: [
      TwitterController
    ],
    modules: [
      DatabaseModule
    ],
    components: [
      ...entryProviders
    ],
})
export class TwitterModule {}
