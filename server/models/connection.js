import pg from 'pg';
import config from '../config/config';

const nodeEnv = process.env.NODE_ENV;

let db;

switch (nodeEnv) {
  case 'production':
    db = config.production;
    break;
  case 'test':
    db = config.test;
    break;
  default:
    // eslint-disable-next-line
    console.log('-------> creating');
    db = config.development;
}
// eslint-disable-next-line
console.log(nodeEnv);

export default new pg.Pool(db);
