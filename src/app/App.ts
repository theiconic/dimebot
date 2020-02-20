import 'reflect-metadata';
import config from './config';
import * as winston from 'winston';
import * as express from 'express';
import { BotFactory } from './bot/factory/BotFactory';
import { getConnectionManager } from 'typeorm';
import { Container } from 'aurelia-dependency-injection';
import { DatabaseProvider } from '../data/database/DatabaseProvider';
import { DefaultController } from './controller/DefaultController';
import { SlackBot } from './bot_wrapper/SlackBot';

class App {
  public readonly app: express.Application;
  private readonly container: Container;

  public constructor() {
    this.app = express();
    this.container = new Container();

    this.init().then(() => {
      this.config();
      this.routes();
      this.initializeBot();
    });
  }

  private async init(): Promise<void> {
    const database = new DatabaseProvider(getConnectionManager());
    await database.connect(config.database);
    this.container.registerInstance(DatabaseProvider, database);
    this.registerBotEngines();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    winston.configure(config.winston);
  }

  private initializeBot(): void {
    const factory = this.container.get(BotFactory);
    factory.start(config.bot);
  }

  private routes(): void {
    this.app.use('/', this.container.get(DefaultController).router);
  }

  private registerBotEngines(): void {
    this.container.registerSingleton(SlackBot.name, SlackBot);
  }
}

export default new App().app;
