import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Model, Schema } from 'mongoose';
const Twitter = require('twitter');
import * as rp from 'request-promise-native';

export class Entry {
  jid         : string;
  tweets   : any[];
}

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

@ApiUseTags('twitter')
@Controller('twitter')
export class TwitterController {

  constructor(
    @Inject('EntryModelToken') private readonly entryModel: Model<any>) {
    this.cron();
  }

  @Get()
  @ApiResponse({ status: 200, description: `Returns list of all twitts`})
  async root() {
    // return await this.getTwitterData('microservice');
    return await this.entryModel.find().lean();
  }

  getTwitterData(q: string): Promise<{id:number, text: string}[]> {
    return new Promise((resolve, reject) => {
      client.get('search/tweets', {q: q}, function(error, tweets, response) {
        if (error) { reject(error); } else {
          resolve(tweets.statuses);
        }
      });
    });
  }

  @Get('/cron')
  @ApiResponse({ status: 200, description: `Trigger cron`})
  async cron(): Promise<any> {
    let jobsFound;
    try {
      jobsFound = await rp({uri: 'http://apijob:3000/job', json: true});
    } catch (e) {
      return e.message;
    }
    const out = [];
    for (let i = 0; i < jobsFound.length; i++) {
      if (jobsFound[i].twitterTag) {
        const t =  {jid: jobsFound[i]._id, tweets:  await this.getTwitterData(jobsFound[i].twitterTag)  };
        out.push(t);
        await new this.entryModel(t).save();
      }
    }
    return out;
  }
}
