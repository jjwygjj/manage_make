import request from 'request';
import {pass} from '../lib';
import fs from 'fs';

export async function fetch(incs){
  if (incs.length === 0){
    console.log('Makefile 不包含include')
    return
  }
  console.log('正在更新.....')
  for (let inc of incs) {
    const user = inc.split(' ')[1].split('/')[0]
    const file = inc.split(' ')[1].split('/')[1]
    const options = {
      url: `https://raw.githubusercontent.com/${user}/make/master/${file}`,
      headers: {
        'User-Agent': 'request'
      }
    };
    function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      makedir(`/usr/local/include/${user}`).then(()=>{
        fs.writeFileSync(`/usr/local/include/${inc.split(' ')[1]}`, body)
        console.log(`更新完成：${file}`)
      })
    }
  }
    request(options, callback);
  }
}

function makedir (dir) {
  return new Promise((resolve, reject) => {
    pass('mkdir', dir).then(()=>{
      resolve()
    })
  })
}
