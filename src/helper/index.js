import parser from '../parser'

export async function helper(target){
  const parse = await parser.parse()
  if (parse.targets.length === 0){
    console.log('请先更新!..')
    return
  }
  if (target) return await single(target, parse)
  return await all(parse)
}

async function all(parse){
  let result = `update:\n`
  parse.annotations.forEach((annotation,index)=>{
    result += `${parse.targets[index]}:\t\t${annotation.split('\n')[0]}\n`
  })
  console.log(result)
  return Buffer.from(result);

}

async function single(target, parse){
  let result = `update:\n`
  const t = parse.targets.indexOf(target)
  const annotation = parse.annotations[t] || '\n'
  if(annotation === '\n') {
    console.log(`未找到合适命令${target}，请用help命令查看`);
    return
  }
  result += `${target}:\n\n${annotation}`
  console.log(result)
  return Buffer.from(result);

}
