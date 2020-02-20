
export class RegExpMatch extends RegExp {
  public match(text: string): RegExpExecArray | null {
    let execArray: RegExpExecArray | null = null;
    let found = false;

    do {
      const match = this.exec(text);
      found = match != null && match.length > 0;

      if (!match || !found) {
        continue;
      }

      if (execArray) {
        execArray.push(match[0]);
      } else {
        execArray = match;
      }
    } while (found);

    return execArray;
  }
}
