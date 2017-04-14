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
      resolve(new IO(result, ''))
    });
  }).then()
}
export async function getIncludes () {
  const file = path.normalize(`${__dirname}/../../Makefile`)
  return await readline(file)
}

export async function getSources () {
  const io = await getIncludes()
  let result = [];
  for (let inc of io.result) {
    const readl = await readline(`/usr/local/include/${inc.split(' ')[1]}`)
    const source = fileIsExist(`/usr/local/include/${inc.split(' ')[1]}`)? readl.result : []
    result = result.concat(source)
  }

  return new IO(result, '')
}
export function pass(commander,value) {
  return new Promise((resolve, reject) => {
    const ls = spawn(commander, [value]);

    ls.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    ls.stderr.on('data', (data) => {

      switch (isMkdirOrStop(data)) {
          case 'mkdir':
            return resolve()
            break;
          case 'Stop':
            console.log(`未找到合适命令${value}，请用help命令查看!`);
            return
            break;
          default:
          console.log(`${data}`);
      }
    });

    ls.on('close', (code) => {
      resolve()
    });
  })

}

function fileIsExist (path) {
  return fs.existsSync(path)
}
function isMkdirOrStop(data){
  return data.toString().split(':')[0] === 'mkdir'? 'mkdir': data.toString().indexOf('Stop') > -1? 'Stop' :null
}

class IO {
  constructor(result, error) {
    this.result = result
    this.error = error
  }
}
