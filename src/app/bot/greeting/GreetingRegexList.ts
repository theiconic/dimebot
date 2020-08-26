const sharedGreetings = [
  'nice work',
  'nice( one)?',
  'well done',
  'congrats',
  'good job',
  'amazing',
  'awesome',
  'legends?',
  'obrigad(o|a)',
  'woo',
  'yay',
  'onya',
  'cheers( mate(s?)?)?',
  'ta',
  'you beaut',
  'good on ya( mate(s?)?)?',
  'tha?n?x( to)?',
  'ty',
  'team player( award)?',
  '(much(o|as) )?gracias',
  'danke( schoen)?',
  'grazie',
  '(domo )?arigato',
  'mahalo',
  'Дякую',
];

const specificGreetings = [
  '<@[^>]+> \\+{2}',
  '<@[^>]+>\\+{2}',
  '<@[^>]+> tks|thank(s| you)!{0,}',
  'tks|thank(s| you)!{0,} <@[^>]+>',
];

const handlerPattern = '<@[^>]+>';

const prefixList = sharedGreetings.map((greeting) => {
  return handlerPattern + ' ' + greeting + '\\b';
});

const suffixList = sharedGreetings.map((greeting) => {
  return '\\b' + greeting + ' ' + handlerPattern;
});

const stringList = specificGreetings.concat(prefixList).concat(suffixList);

export const greetingRegexList: RegExp[] = stringList.map((pattern) => {
  return new RegExp(pattern, 'i');
});
