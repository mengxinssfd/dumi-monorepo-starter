import Path from 'path';
import Fs from 'fs';

export function getAlias(): Record<string, string> {
  const pkgsPath = Path.resolve(__dirname, '../packages');

  const pkgs = Fs.readdirSync(pkgsPath) || [];

  return {
    ...pkgs.reduce(
      (prev, cur) => {
        prev['@pkg/' + cur] = Path.resolve(pkgsPath, `${cur}/src`);
        return prev;
      },
      {} as Record<string, string>,
    ),
  };
}
