import { autoinject } from 'aurelia-dependency-injection';
import winston = require('winston');
import Botkit = require('botkit');
import { Bot, BotConfiguration, Message, HearsCallback } from './Bot'

@autoinject()
export class SlackBot implements Bot {
  private slackController!: Botkit.SlackController;
  private slackBot!: Botkit.SlackBot;

  public start(config: BotConfiguration): void {
    if (config.accessToken == null || config.signingSecret == null) {
      winston.error('Invalid configuration for SlackBot. Please include valid `accessToken` and `signingSecret` values.');
      return;
    }

    this.slackController = Botkit.slackbot({
      clientSigningSecret: config.signingSecret,
      scopes: ['bot'],
      retry: 10,
    });

    this.slackBot = this.slackController.spawn({ token: config.accessToken });
    this.slackBot.startRTM();
  }

  public hears(keywords: string | string[] | RegExp | RegExp[], events: string | string[], callback: HearsCallback): void {
    this.slackController.hears(keywords, events, async (bot, slackMessage) => {
      callback(slackMessage);
    });
  }

  public reply(src: Message, resp: string | Message): Promise<any> {
    return new Promise((resolve, reject) => {
      this.slackBot.reply(src, resp, (err: Error, res: any) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  public say(message: string | Message): Promise<any> {
    return new Promise((resolve, reject) => {
      this.slackBot.say(message, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  public replyInThread(src: Message, resp: string | Message): Promise<any> {
    return new Promise((resolve, reject) => {
      this.slackBot.replyInThread(src, resp, (err, res) => {
        if (err) {
          winston.error('Failed to send message: ' + src.text + 'error: ' + err);
          reject(err);
        } else {
          winston.debug('>> Message sent: ' + src.text);
          resolve(res);
        }
      });
    });
  }

  public addReaction(timestamp: string, channel: string, reactionName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.slackBot.api.reactions.add({
        timestamp: timestamp,
        channel: channel,
        name: reactionName,
      }, (err, res) => {
        if (err) {
          winston.error('Failed to add emoji reaction :(', err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
