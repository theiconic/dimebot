const stringList = [
  'scoreboard',
  'leaderboard',
  'ranking',
  'score',
  'currency?',
  'hearts?',
  'coins?',
  'appreciations?',
  'scorecard',
  'top'
];

export const scoreboardRegexList: RegExp[] = stringList.map((pattern) => {
  return new RegExp('\\b' + pattern + '\\b', 'i');
});
