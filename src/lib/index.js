import _readline from 'readline';
import fs from 'fs';
import path from 'path';

export function readline () {
  return new Promise((resolve, reject) => {
    let result = [];
    const rl = _readline.createInterface({
      input: fs.createReadStream(path.normalize(`${__dirname}/../../Makefile`))
    });

    rl.on('line', (line) => {
      result.push(line)
    });
    rl.on('close', () => {
      resolve(result)
    });
  }).then()
}
