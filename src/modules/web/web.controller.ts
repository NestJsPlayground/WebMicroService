import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Model, Schema } from 'mongoose';
const Twitter = require('twitter');
import * as rp from 'request-promise-native';

export class Entry {
  jid         : string;
}

@ApiUseTags('web')
@Controller('web')
export class TwitterController {

  constructor(
    @Inject('EntryModelToken') private readonly entryModel: Model<any>) {
  }

  @Get()
  @ApiResponse({ status: 200, description: `Returns list of all web pages for jobs`})
  async root() {
    let jobsFound;
    try {
      jobsFound = await rp({uri: 'http://apijob:3000/job', json: true });
    } catch (e) {
      return e.message;
    }
    const out = [];
    for (let i = 0; i < jobsFound.length; i++) {
      if (jobsFound[i].page) {
        const regex = /(&nbsp;|<([^>]+)>)/ig
          ,   body = await rp({uri: jobsFound[i].page})
          ,   result = body.replace(regex, '');
        const t =  {jid: jobsFound[i]._id, www:  result  };
        out.push(t);
        // await new this.entryModel(t).save();
      }
    }
    return out;
  }
}
