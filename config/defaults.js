'use strict'

const admins = process.env.BOT_ADMINS.split(',');

if (admins[0] === '') {
  console.error('[WARNING] No admin specificed under `BOT_ADMINS`!');
}

const currency = {
  name: 'sly cat',
  plural: 'sly cats',
  emoji: ':sly_cat:',
  milestone: 100,
};

const config = {
  currency,
  messages: {
    balance: `You have %count% ${currency.emoji}!`,
    milestone: `${currency.emoji} *Congratulations* to %name% for reaching *%count% ${currency.plural}*! Keep up the good work!`,
    scoreboard: `%user% %count% ${currency.emoji}\n`,
  },
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  bot: {
    engine: process.env.BOT_ENGINE,
    accessToken: process.env.BOT_TOKEN,
    signingSecret: process.env.BOT_SIGNING_SECRET,
    milestoneChannel: process.env.BOT_PRAISE_CHANNEL,
  },
  logger: {
    format: 'tiny',
    options: {}
  },
  admin: {
    users: admins
  },
}

module.exports = config
