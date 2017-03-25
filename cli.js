require("babel-core/register");
require("babel-polyfill");
var helper = require('./src').helper;
var pass = require('./src').pass;
var fetch = require('./src').fetch;
var getIncludes = require('./src').getIncludes;

var param = !!process.argv[2] && process.argv[2]!='help'&& process.argv[2]!='update'? 'pass': process.argv[2]
switch (param) {
  case 'help':
    helper(process.argv[3])
    break;
  case 'update':
      getIncludes().then((incs)=>{
        fetch(incs)
      })
      break;
  case 'pass':
    pass('make',process.argv[2])
    break;
  default:
    console.log('未发现可用命令')
}
