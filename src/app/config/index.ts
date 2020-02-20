import * as dotenv from 'dotenv';
import { merge } from 'lodash';
import { TransportInstance } from 'winston';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

let config = require('../../../config/defaults');
const database = require('./database');

const databaseConfig = {
  database: database.connectionOptions,
};

let localConfig = {};

try {
  localConfig = require(`../../../config/${config.env}`);
} catch (e) { }

const winston = require(`./winston/${config.env}`);
const winstonConfig = {
  winston: winston.configOptions,
};

if (!process.env.BOT_ENGINE) {
  winston.error('##### BOT_ENGINE not set in .env file #####');
}

config = merge({}, config, databaseConfig, localConfig, winstonConfig);

export default config as Config;

export interface Config {
  name: string,
  currency: {
    name: string,
    emoji: string,
    milestone: number,
  },
  admin: {
    users: string[]
  },
  messages: {
    balance: string,
    milestone: string,
    scoreboard: string,
  }
  env: string,
  port: number,
  bot: {
    engine: string,
    accessToken?: string,
    signingSecret?: string,
    milestoneChannel: string
  },
  logger: {
    format: string
  },
  database: ConnectionOptions,
  winston: {
    transports: TransportInstance[]
  }
}