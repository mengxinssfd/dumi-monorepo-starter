import { getGitUrl, cmdGet } from './utils';
import rootPkg from '../package.json';
import { prompt } from 'enquirer';
import * as Path from 'path';
import Fse from 'fs-extra';
import chalk from 'chalk';

const rootDir = Path.resolve(__dirname, '../');

const config = {
  projectName: '',
  mainPkgName: '',
};

async function start() {
  await Steps.query();
  Steps.initPackageJson();
  Steps.initDumirc();
}

const Steps = {
  async query() {
    const dirName = Path.basename(rootDir);
    ({ name: config.projectName } = await prompt<{ name: string }>({
      message: '项目名称: ',
      initial: dirName,
      type: 'input',
      name: 'name',
    }));
    ({ name: config.mainPkgName } = await prompt<{ name: string }>({
      initial: dirName,
      message: '主包名: ',
      type: 'input',
      name: 'name',
    }));
  },
  initPackageJson() {
    rootPkg.name = config.projectName;
    rootPkg.repository.url = getGitUrl();
    rootPkg.author = cmdGet('git config user.name');
    Fse.writeFileSync(
      Path.resolve(rootDir, 'package.json'),
      JSON.stringify(rootPkg, null, 2) + '\n',
    );
  },
  initDumirc() {
    const p = Path.resolve(rootDir, '.dumirc.ts');
    let content = Fse.readFileSync(p, 'utf-8');
    content = content.replace(
      /\s{4}name: '([\w\-@\/]+)'/,
      `    name: '${config.mainPkgName}'`,
    );
    Fse.writeFileSync(p, content);
  },
};

start().then(() => console.log(chalk.cyan`pkg init success!`));
