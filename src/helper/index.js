import parser from '../parser'
import R from 'ramda'

export async function helper(target){
  const parse = await parser.parse()
  if (parse.targets.length === 0){
    console.log('请先更新!..')
    return
  }

  switch (!!target) {
    case true:
      return await single(target, parse)
      break;
    default:
      return await all(parse)
  }
}

async function all({targets, annotations}){
  let result = `update:\n`
  let index =-1
  R.forEach((annotation)=>{
    result += `${targets[++index]}:\t\t${annotation.split('\n')[0]}\n`
  }, annotations)
  console.log(result)
  return Buffer.from(result);

}

async function single(target, {targets, annotations}){
  let result = `update:\n`
  const t = R.indexOf(target, targets)
  const annotation = annotations[t] || '\n'
  if(annotation === '\n') {
    console.log(`未找到合适命令${target}，请用help命令查看`);
    return
  }
  result += `${target}:\n\n${annotation}`
  console.log(result)
  return Buffer.from(result);

}
