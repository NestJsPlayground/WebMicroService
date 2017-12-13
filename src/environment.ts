const envType = (process.env.NODE_ENV || 'dev') as 'dev' | 'prod' | 'stage' | 'test';
const appName = 'apiseed';

export const environment = {
  appName,
  envType,

  consul: envType !== 'dev' ? { host: `consul`} : {},

  logstash: process.env.LOGSTASH_HOST && {
    node_name: appName,
    port: 5010,
    host: process.env.LOGSTASH_HOST
  },

  // unless in local development mode we will use Kubernetes service discovery and env to inject
  mongo: process.env.MONGO_HOST || `mongodb://${ process.env.MONGO || (envType === 'dev' ? 'localhost:47017' : 'mongo:47017') }/${ this.appName }`


  ,


  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  }
};

console.log(environment);
