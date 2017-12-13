import { Connection } from 'mongoose';
import { EntrySchema } from './web.schema';

export const entryProviders = [
  {
    provide: 'EntryModelToken',
    useFactory: (connection: Connection) => connection.model('Twitter', EntrySchema),
    inject: ['DbConnectionToken'],
  },
];
