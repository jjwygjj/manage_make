import _readline from 'readline';
import fs from 'fs';
import path from 'path';
import {spawn} from 'child_process';

export function readline (file) {
  return new Promise((resolve, reject) => {
    let result = [];
    const rl = _readline.createInterface({
      input: fs.createReadStream(file)
    });

    rl.on('line', (line) => {
      result.push(line)
    });
    rl.on('close', () => {
      resolve(result)
    });
  }).then()
}
export async function getIncludes () {
  const file = path.normalize(`${__dirname}/../../Makefile`)
  const inc = await readline(file)
  return inc
}

export async function getSources () {
  const includes = await getIncludes()
  let result = [];
  for (let inc of includes) {
    const source = await readline(`/usr/local/include/${inc.split(' ')[1]}`)
    result = result.concat(source)
  }

  return result
}
export function pass(commander,value) {
  return new Promise((resolve, reject) => {
    const ls = spawn(commander, [value]);

    ls.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    ls.stderr.on('data', (data) => {
      if(data.toString().split(':')[0] === 'mkdir'){
        return resolve()
      }
      if(data.toString().indexOf('Stop') > -1) {
        console.log(`未找到合适命令${value}，请用help命令查看`);
        return
      }
      console.log(`${data}`);
    });

    ls.on('close', (code) => {
      resolve()
    });
  })

}
