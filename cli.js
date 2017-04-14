require("babel-core/register");
require("babel-polyfill");
var helper = require('./buildsrc').helper;
var pass = require('./buildsrc').pass;
var fetch = require('./buildsrc').fetch;
var getIncludes = require('./buildsrc').getIncludes;

var param = !!process.argv[2] && process.argv[2]!='help'&& process.argv[2]!='update'? 'pass': process.argv[2]
switch (param) {
  case 'help':
    helper(process.argv[3])
    break;
  case 'update':
      getIncludes().then(({result})=>{
        fetch(result)
      })
      break;
  case 'pass':
    pass('make',process.argv[2])
    break;
  default:
    console.log('未发现可用命令')
}
