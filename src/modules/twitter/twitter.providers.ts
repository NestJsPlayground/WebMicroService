import { Connection } from 'mongoose';
import { EntrySchema } from './twitter.schema';

export const entryProviders = [
  {
    provide: 'EntryModelToken',
    useFactory: (connection: Connection) => connection.model('Twitter', EntrySchema),
    inject: ['DbConnectionToken'],
  },
];
