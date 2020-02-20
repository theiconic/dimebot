import { transports } from 'winston';

export const configOptions = {
  transports: [
    new transports.Console({
      colorize: true,
    }),
  ],
};
