import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TwitterController } from './twitter.controller';
import { entryProviders } from './twitter.providers';

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
