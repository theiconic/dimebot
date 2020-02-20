
<img src="assets/dimebot_logo.png"/>

# Dimebot

Dimebot is a Slack bot created as a [Pet Project](https://theiconic.tech/5-reasons-to-work-for-the-iconic-tech-team-785f37126fbf) at THE ICONIC.

It is a way to publicly acknowledge others' accomplishments, that they've helped you in some way, or have otherwise made your day. It's not just about sharing the wealth or getting dimes, but sharing your appreciation. Everyone is valuable in some way — with this bot you can let everyone know who!

## Features

### Greeting users

Dimebot listens to many greetings listed [here](https://github.com/theiconic/dimebot/blob/master/src/app/bot/greeting/GreetingRegexList.ts#L1). These default greetings only work when said before or after the greeted person's handler. For example: `nice work @person` or `@person nice work yesterday`.

Variations of the word `thank you` are considered special tokens and will automatically greet all handles included in the message, regardless of where it's placed. For example: `thanks for the amazing work done today @person, @anotherperson and @onemoreperson`, will greet all the three handlers at the same time.


Edited messages will not greet users.

### Checking high scores and balances

There are a few ways of learning how many greetings people have received. Sending a direct private message to @dimebot or mentioning it in a message saying any of the words below will make the bot reply with the top highest balance users.

```
'scoreboard',
'leaderboard',
'ranking',
'score',
'currency',
'hearts',
'coins',
'appreciations',
'scorecard',
'top'
```

Saying `top {number}` makes the bot reply with the same list limited to the number in the input. For example, `top 100`.

By sending a private message to @dimebot saying `balance` it replies with the user's balance.

### Milestones

Whenever a user reaches a certain amount of dimes (see the [Customising Dimebot section](#customising)) they are praised by the bot in the specified channel (defined in the `.env` file). The milestone number is basicaly a "multiple of" the set amount. For example, using the default 100 dimes milestone, users will be praised when reaching 100, 200, 300, and so on dimes with the default message:

`Congratulations to @person for reaching 100 dimes! Keep up with the good work!`

### Whitelisting new channels

Dimebot only listens to channels which it's invited to and are also whitelisted by the bot's admins (see [Configuring the `.env` file section](#configuring) to setup admins).

Whitelisted channels are managed through private messages sent by the Admins to the bot. There are only three commands:

- `show whitelist` Dimebot prints all the whitelisted channels

- `add whitelist #mychannel` Adds `#mychannel` to the whitelist.

- `remove whitelist #mychannel` Removes `#mychannel` from the whitelist.

### <a name="customising"></a>Customising Dimebot

Dimebot was built with a few customisation possiblities in the `config` file. For example, the milestone message, scoreboard format, currency name and emoji can be changed. The default values are defined [here](https://github.com/theiconic/dimebot/blob/master/config/defaults.js#L9).

## Requirements
* Docker 17+

## Setting up local environment
```
git clone git@github.com:theiconic/dimebot.git
cp .env.dist .env # you also need to configure the tokens.
make build
```

Test service is running: ```curl http://localhost:3010/ping```

## <a name="configuring"></a>Configuring the `.env` file

Currently Dimebot only integrates with Slack. In the `.env` file you need to define the values of the following keys:

- `BOT_TOKEN` Bot User OAuth Access Token.

- `BOT_SIGNING_SECRET` Slack signs the requests sent to you using this secret. This confirms that each request comes from Slack by verifying its unique signature.

- `BOT_PRAISE_CHANNEL` The channel Dimebot uses to shoutout to people who have achieved the milestone set in the `config` file. Expected format: `CA1234567`.

- `BOT_ADMINS` List of admin who can manage the whitelisted channels. Separate the user handles by comma if you have multiple. Expected format: `U12345678,U87654321,U12348765`

Example of `.env` file for running with Docker/Docker Compose:

```
MYSQL_DBNAME=dimebot
MYSQL_HOST=dimebot-mysql
MYSQL_USERNAME=root
MYSQL_PASSWORD=root
BOT_TOKEN=sometoken
BOT_SIGNING_SECRET=somesecret
BOT_PRAISE_CHANNEL=CA123456
BOT_ENGINE=SlackBot
BOT_ADMINS=UA123456,UA456789
```


### Available make commands for Docker Compose

- `make build` installs dependencies, builds project, and runs migrations.
- `make restart` recompiles the project and restarts the containers.
- `make down` kills the containers.

## Testing the bot

### Automated Tests
Run `npm run test:unit` to run the unit tests.

### Manual Tests / QA

Dimebot uses websocket connections to [Slack's RTM API](https://api.slack.com/rtm) via [Botkit](https://botkit.ai/docs/v0/readme-slack.html). In order to test your changes without affecting your real bot you need to setup an alternative account.

For example, you setup a "production bot" named `@dimebot`, and another for testing purposes named `@dimebottest`.

Create a test channel, invite `@dimebottest` to it, then send it a private message to include the new channel to the whitelist `add whitelist #mytestchannel` (assuming you are one of the bot admins setup in the `.env` file).

## Useful commands
Create a new migration file:

```
npm run create-migration -- SampleMigrationName
```

## MIT License

Copyright (c) 2020 THE ICONIC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
